<?php
/*
**
** <<RDM>> 20 08 2015
** login/signup/change function for CleaverFox
** dependencies :: 2
** |
** |-- serverConnector[.]php for db connection
** |-- sessionConn[.]php for session handling
** ~~~
**
*/

include_once ("serverConnector.php");
include_once ("jwtGenerator.php");

require 'vendor/autoload.php';

use SparkPost\SparkPost;
use GuzzleHttp\Client;
use Http\Adapter\Guzzle6\Client as GuzzleAdapter;

class palika extends connector {

  protected $response = array();

  public function userAdaptor($operation, $value){
    if($value == "" || $value == "" || $value == NULL){
      return $this->$operation();
    }else{
      return $this->$operation($value);
    }
  }

  public function login($value){
    //echo $value;
    //print_r($value);
    $this->clearOldResponseData();
    $oBasic = new besic();
    $ifUser = $oBasic->userAdaptor('checkIfEmailExists', md5($value['email']));
    //echo "ifUser >> ".$ifUser."::";
    if($ifUser == "true"){
      $result = "";
      // $simple_email = $value['email'];
      $value['email'] = md5($value['email']);
      $value['password'] = md5($value['password']);
      $jwtObj = new jwtGenerator();
      $jwt = $jwtObj->EncodeToken(array('email'=>$value['email'],'password'=>$value['password']));
      $query = "SELECT flag as flag FROM `aff_instance` WHERE email = ?" ;
      $result = $this->query_db($query, $value);
      $result = mysqli_fetch_array($result);
      $this->db_close();
      if($result != ""){
          $response['response'] = "true";
          $response['token'] = $jwt;
          $response['adminFlag'] = $result['flag'];
          return $response;
        }else{
          $response['response'] = "false";
          $response['errMessage'] = 'Cant get Package info';
          return $response;
            }
    }else{
      $response['response'] = "rfalse";
      $response['errMessage'] = "User not exist.";
      return $response;
    }
  }

  public function signUp($value){
    $this->clearOldResponseData();
    $oBasic = new besic();
    $ifUser = $oBasic->userAdaptor('checkIfEmailExists', md5($value['email']));
    if($ifUser == "false"){
      $result = "";
    $value['email'] = md5($value['email']);
    $value['password'] = md5($value['password']);
   $unq= sprintf('%06x', mt_rand(0, 16777215));
  //  $unq = uniqid();
    $val1 = array('Email'=>$value['email'],'code'=>$unq,'full_name' =>$value['fullname'] ,'mobile_no'=>$value['mobNo']);
    $val = array('email'=>$value['email'],'password' =>$value['password'],'flag'=>0);
    $query1 = "INSERT INTO affiliate_table (Email, code, full_name, mobile_no) VALUES( ?, ?, ?, ?)";
    $result1 = $this->query_db($query1, $val1);    
    $query = "INSERT INTO aff_instance (email,password,flag) VALUES(?, ?, ?)";
    $result = $this->query_db($query, $val);
    $this->db_close();
    if($result == 1){
      $response['response'] = "true";
      $response['errMessage'] = "affiliate updated successfully";
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = "Cant update affiliate";
      return $response;
    }
  }else{
    $response['response'] = "rfalse";
    $response['errMessage'] = "User already exist.";
    return $response;
  }
}

function affHomeData($value){
  $this->clearOldResponseData();
  $jwtObj = new jwtGenerator();
    $jwt = json_decode(json_encode($jwtObj->DecodeToken(json_decode($value['token']))),true);
    $vals['email'] = $jwt['data']['email'];
    // print_r($jwt);
    $oBasic = new besic();
    $onj = $oBasic->getsignUpCode($vals['email']);
    $falsedata = array("code"=>$onj['code'],"full_name"=>$onj['full_name']);  
    $oBasic = new besic();
    $activePoints = $oBasic->getActivePoint($onj['code']);
    $query = "SELECT COUNT(*) as count_code, full_name, code FROM `compension_view` WHERE code = ?";
    $res = $this->query_db($query,$onj['code']);
    $result = mysqli_fetch_array($res);
    // echo $result;
    $data = array("count"=>$result['count_code'],"full_name"=>$result['full_name'],"code"=>$result['code'],"activePoint"=>$activePoints);
    // print_r($data);
    // echo $result['count_code'];
    if(!$result['count_code']==""){
      $response['response'] = "true";
      $response['Message'] = "Got view successful";
      $response['result'] = $data;
      return $response;
    }else{
      $response['response'] = "false";
      $response['Message'] = "Got the CODE and Full name";
      $response['result'] = $falsedata;
      return $response;
    }
}

public function enquiry($value){
    $this->clearOldResponseData();
    // print_r($value);
     $val = array('student_name' =>$value['studentFN'] ,'parent_name' =>$value['parentFN'],
    'school_name' =>$value['schoolName'],'class_name' =>$value['class'],
    'board_name' =>$value['board'],'email' =>$value['email'],'mobile_no'=>$value['mobNo'],
    'address' =>$value['address'],'landmark' =>$value['landmark'],
    'anynote' =>$value['note'],'code'=> $value['refCode'],'status'=>"Pending");
    $query = "INSERT INTO enquiry_table (student_name, parent_name, school_name, class_name, 
      board_name, email, mobile_no, address,  landmark, anynote, code,status
      ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";    
      $result = $this->query_db($query, $val);
    $this->db_close();
    // echo $result;
        if($result == 1){
      $response['response'] = "true";
      $response['errMessage'] = "enquiry saved successfully";
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = "Cant save enquiry";
      return $response;
    }
  }

public function leadList($value){
  $this->clearOldResponseData();
  $query = "SELECT `student_name` AS 'nameOfStudent', `parent_name`AS 'parentName', `school_name`AS 'School', `class_name` AS 'class', 
  `board_name`AS 'Board', `email`AS 'Email', `mobile_no`AS 'mobileNumber', `address`AS 'Address',`landmark`AS 'Landmark', `anynote`AS 'noteRequirnment',`status`AS 'Status'
  ,`id` AS 'id' FROM `enquiry_table`";
  $res = $this->query_db($query,NULL);
    $result = mysqli_fetch_all($res,MYSQLI_ASSOC);
    $this->db_close();
    if($result != ""){
      $response['response'] = "true";
      $response['Message'] = "Got view successful";
      $response['result'] = $result;
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = 'Cant get  info';
      return $response;
    }
}

public function affiliateList($value){
  $this->clearOldResponseData();
  $retVal=[];
  $query = "SELECT `full_name` AS 'nameOfStudent',`mobile_no` AS 'mobileNumber' , `code` FROM `affiliate_table`";
  $res = $this->query_db($query,NULL);
  $result = mysqli_fetch_all($res,MYSQLI_ASSOC); 
  for ($i=0; $i<sizeof($result);$i++){
  $oBasic = new besic();
  $TotalUserPoint = $oBasic-> getUserTotalPoint($result[$i]['code']);
  $oBasic = new besic();
  $ActiveUserPoint = $oBasic-> getUserActivePoint($result[$i]['code']);
  $oBasic = new besic();
  $TotalUserPending = $oBasic-> getUserPendingPoint($result[$i]['code']);
  $oBasic = new besic();
  $Rejected = $oBasic-> getUserRejectedPoint($result[$i]['code']);
  $oBasic = new besic();
  $TotalUserLead = $oBasic-> getUserLead($result[$i]['code']);
  array_push($retVal,array("nameOfStudent"=>$result[$i]['nameOfStudent'],"mobileNumber"=>$result[$i]['mobileNumber'],"activPoint"=>$ActiveUserPoint,"TotalPoint"=>$TotalUserPoint,"Total"=>$TotalUserLead,"Conversion"=>$ActiveUserPoint,"Pending"=>$TotalUserPending,"Rejected"=>$Rejected));      
  // print_r($data);
  }
  $this->db_close();
  if($retVal != ""){
      $response['response'] = "true";
      $response['Message'] = "Display Info successful";
      $response['result'] = $retVal;
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = "Cant display Info";
      return $response;
    }
// }
}

public function count($value){
  $oBasic = new besic();
    $Affiliatecount = $oBasic-> affCount();
    $oBasic = new besic();
    $leadCount = $oBasic-> getleadCount($value);
    $oBasic = new besic();
    $totalConversion = $oBasic-> getCoversionCount();
    $data = array("affilitesCount"=>$Affiliatecount,"leadCount"=>$leadCount,"totalConversion"=>$totalConversion);
    if($Affiliatecount == "false"){
     $response['response'] = "false";
     $response['errMessage'] = 'Cant get  info';
      return $response;
  }else{
    $response['response'] = "true";
    $response['Message'] = "Got affiliatecount successful";
    $response['result'] = $data;
    return $response;
  }
}
public function countByuser($value){
  $this->clearOldResponseData();
  $jwtObj = new jwtGenerator();
    $jwt = json_decode(json_encode($jwtObj->DecodeToken(json_decode($value['token']))),true);
    $vals['email'] = $jwt['data']['email'];
    // print_r($jwt);
    $oBasic = new besic();
    $onj = $oBasic->getsignUpCode($vals['email']);
  $oBasic = new besic();
    $TotalUserPoint = $oBasic-> getUserTotalPoint($onj['code']);
    $oBasic = new besic();
    $ActiveUserPoint = $oBasic-> getUserActivePoint($onj['code']);
    $oBasic = new besic();
    $TotalUserPending = $oBasic-> getUserPendingPoint($onj['code']);
       $oBasic = new besic();
    $Rejected = $oBasic-> getUserRejectedPoint($onj['code']);
     $oBasic = new besic();
    $TotalUserLead = $oBasic-> getUserLead($onj['code']);

    $data = array("activPoint"=>$ActiveUserPoint,"TotalPoint"=>$TotalUserPoint,"Total"=>$TotalUserLead,"Conversion"=>ActiveUserPoint,"Pending"=>TotalUserPending,"Rejected"=>Rejected);
    if($Affiliatecount == "false"){
     $response['response'] = "false";
     $response['errMessage'] = 'Cant get  info';
      return $response;
  }else{
    $response['response'] = "true";
    $response['Message'] = "Got affiliatecount successful";
    $response['result'] = $data;
    return $response;
  }
}
// status changing func pending to completed and completed to rejected
public function changeStatus($value){  
  $this->clearOldResponseData();
  // echo $value;
  if($value['status']=="Pending"){
  $val = $value['status'];
  $val1 = $value['id'];
  $query = "UPDATE enquiry_table SET Status = 'Completed' WHERE id = ?";
  $result = $this->query_db($query, $val1);
      $this->db_close();
      if($result == 1){
        $response['response'] = "true";
        $response['errMessage'] = "Status updates successfully";
        // $response['status'] = $result;
        return $response;
      }else{
        $response['response'] = "false";
        $response['errMessage'] = "Status update failed";
        return $response;
      }     
  }
  else{
    $val = $value['status'];
    $val1 = $value['id'];
    $query = "UPDATE enquiry_table SET Status = 'Rejected' WHERE id = ?";
    $result = $this->query_db($query, $val1);
      $this->db_close();
      if($result == 1){
        $response['response'] = "true";
        $response['errMessage'] = "Status updates successfully";
        // $response['status'] = $result;
        return $response;
      }else{
        $response['response'] = "false";
        $response['errMessage'] = "Status update failed";
        return $response;
      }     
  }

}
public function clearOldResponseData(){
    unset($response);
    $response = array();
  }
}
?>
