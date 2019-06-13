<?PHP

include_once ("serverConnector.php");
//include_once ("sessionConn.php");
include_once ("jwtGenerator.php");

class besic extends connector{

  protected $response = array();

  public function userAdaptor($operation, $value){
    //echo "\nOperation >> ".$operation." << value >> ".$value['email'];
    if($value == "" || $value == " " || $value == NULL){
      return $this->$operation();
    }else{
      return $this->$operation($value);
    }
  }
// internal func used in gurukul
  private function checkIfEmailExists($value){
    // get email from user instance where email == $value
    $query = "SELECT `email` FROM `aff_instance` WHERE `email`= ?";
    $result = $this->query_db($query, $value);
    $result = mysqli_fetch_array($result);
    $this->db_close();
    if(!isset($result['email'])){
      return "false";
    }else{
      return "true";
    }
  }
// internal func used in gurukul
  public function getsignUpCode($value){
    // get email from user instance where email == $value
    $query = "SELECT `code`,`full_name` FROM `affiliate_table` WHERE `email`= ?";
    //echo vsprintf( str_replace("?","'%s'",$query),$value);
    $result = $this->query_db($query, $value);
    $result = mysqli_fetch_array($result);
    //echo "email : ".$result['email'];
    $this->db_close();
    if(!isset($result['code']) && !isset($result['full_name']) ){
      return "false";
    }else{
      return $result;
      // print_r($result);
    }
  }

// internal func used in gurukul
  public function getCount($value){
    $query = "SELECT COUNT(*) FROM enquiry_table WHERE `status`= ?";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result[0];
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
    public function getleadCount($value){
    $query = "SELECT COUNT(*) FROM enquiry_table";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result[0];
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
   public function getCoversionCount(){
    $query = "SELECT COUNT(*) FROM enquiry_table WHERE `status` = 'Completed'";
    $result = $this->query_db($query, $value); 
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result[0];
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
  public function getActivePoint($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? AND `status` = 'Completed'";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
  public function getUserTotalPoint($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? AND `status` = 'Completed'";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
    public function getUserActivePoint($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? AND `status` = 'Completed'";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
  public function getUserPendingPoint($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? AND `status` = 'Pending'";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
  public function getUserRejectedPoint($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? AND `status` = 'Rejected'";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
  public function getUserLead($value){
    $query ="SELECT COUNT(*) FROM `enquiry_table` WHERE `code` = ? ";
    $result = $this->query_db($query, $value);
    //echo $result;
    $result = mysqli_fetch_array($result);
    // print_r($result);
    // echo $result;
    //echo "email : ".$result['email'];
    // echo $result['code'];
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      return $result[0];
    }
  }
// internal func used in gurukul
  public function affCount(){
    // get the count of affiliate 
    $query = "SELECT COUNT(*) FROM affiliate_table";
    $result = $this->query_db($query,NULL);
    $result = mysqli_fetch_array($result);
    // print_r($result);
    $this->db_close();
    if(!isset($result[0])){
      return "false";
    }else{
      // echo 'internal func' .$result[0];
      return $result[0];
    }
  }

  private function getUserInstanceStatus($value){
    $this->clearOldResponseData();
    //echo $value['token'];
    $jwtObj = new jwtGenerator();
    $jwt = json_decode(json_encode($jwtObj->DecodeToken(json_decode($value['token']))),true);
    //print_r($jwt);
    //echo $jwt['data']['email']; // working
    if (isset($jwt)) {
      $query = "SELECT `info_flag` FROM `user_instance` WHERE `email` = ?";
      $result = $this->query_db($query, md5($jwt['data']['email']));
      $result = mysqli_fetch_array($result);
      $this->db_close();
      //return $result['info_flag'];
      $response['response'] = "true";
      $response['errMessage'] = "Got user instance";
      $response['infoFlag'] = $result['info_flag'];
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = "Token is empty";
      return $response;
    }
  }

  /* from here >> ! if want to cut ! << */

  private function userProfileAdder($value){
    $this->clearOldResponseData();
    $query = "INSERT INTO user_profile (full_name, email, dob, sex) VALUES(?, ?, ?, ?)";
    $result = $this->query_db($query, $value);
    $this->db_close();
    if($result == 1){
      return "true";
    }else{
      return "false";
    }
  }

  private function updateInstanceToO($value){
    $this->clearOldResponseData();
    $jwtObj = new jwtGenerator();
    $jwt = json_decode(json_encode($jwtObj->DecodeToken(json_decode($value['token']))),true);
      //echo $jwt['data']['email'];
    if(($jwt['data']['email'])!="") {
      $query = "UPDATE `user_instance` SET `info_flag` = 1 WHERE `email` = ?";
      $result = $this->query_db($query, md5($jwt['data']['email']));
      $this->db_close();
      $response['response'] = "true";
      $response['errMessage'] = "User instance updated successfully";
      $response['result'] = 1;
      return $response;
    }else{
      $response['response'] = "false";
      $response['errMessage'] = "instance update failed";
      $response['result'] =$result;
      return $response;
    }
  }

  private function updateInstanceToX($value){
    $this->clearOldResponseData();
    $query = "UPDATE `user_instance` SET `info_flag` = 0 WHERE `email` = ?";
    $result = $this->query_db($query, md5($value['email']));
    $this->db_close();
    return $result;
  }

  private function sessionEmailGetter($value){
    $this->clearOldResponseData();
    $jwtObj = new jwtGenerator();
    $jwt = json_decode(json_encode($jwtObj->DecodeToken(json_decode($value['token']))),true);
  //  echo $jwt['data']['email'];
      if($jwt['data']['email']!="") {
        $response['response'] = "true";
        $response['errMessage'] = "Got email From Token";
        $response['email'] = $jwt['data']['email'];
        return $response;
      }
      else{
        $response['response'] = "false";
        $response['errMessage'] = "Email not found";
        return $response;
      }

  }

  private function getOuter(){
    //console.log("getouter");
    // $osx = new sessionExr;
    // $ret = $osx->destroy();
    // return $ret;
  }

  private function isEmailSessionValid($value){
    if(isset($value['email'])){ //Here code Updated
      if($value['email'] != null || $value['email'] != ""){
      return "true";
      }else{
        return "false";
      }
    }else{
      return "false";
    }
  }

  private function isIDSessionValid(){
    if(isset($_SESSION['id']) && $_SESSION['id'] != "" && $_SESSION['id'] != " "){
      return "true";
    }else{
      return "false";
    }
  }

  private function getUserId($value){
    if($this->isEmailSessionValid()){
      if($this->db_connection() == "true"){
        $query = "SELECT `user_id` FROM `user_profile` WHERE `email`= ?";
        $result = $this->query_db($query, $value['email']);
        $result = mysqli_fetch_array($result);
        $this->db_close();
        $result = $result['user_id'];
      }else{
        $result = "false";
      }
    }else{
      $result = "false";
    }
    return $result;
  }

  // private function setIDToSession($value){
  //   $osx = new sessionExr;
  //   $ret = $osx->sessionIDSetter($value);
  //   return $ret;
  // }
  //

  private function getIDFromSession($value){
    $this->clearOldResponseData();

    if($value['email']!=""){
      return true;
    }else{
      return false;
    }
  }

  public function clearOldResponseData(){
    unset($response);
    $response = array();
  }

}
//error_reporting( E_ALL );
//ini_set('display_errors', 1);

?>
