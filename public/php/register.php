<?php
//Sql helper


//Sql connection
$hostname = "127.0.0.1:3306";
$database = "lorrydoc";
$username = "root";
$password = "root";

// Connect to the database
$mysqli = new mysqli($hostname, $username, $password, $database);
/* check connection */
if (mysqli_connect_errno())
{
  printf("Connect failed: %s\n", mysqli_connect_error());
  exit();
}

//Variables
$errors = array();

//Form submitted

if(isset($_POST['add'])){
  //Call class
  $pw = sha1($_POST['usr_password']);
  //Insert into database
  $query = "INSERT INTO customer (usr_first_name,usr_last_name,usr_email,usr_login_name,usr_password) ";
  //Sets value
  $query.= " VALUES (?,?,?,?,?)";
  $result = $mysqli->prepare($query);
  //Binds parameters
  $result->bind_param('sssss',$_POST['usr_first_name'],$_POST['usr_last_name'],$_POST['usr_email'],$_POST['usr_login_name'], $pw);

  $res = $result->execute() or trigger_error($result->error, E_USER_ERROR);
  echo $res;

  $result->close();
}

else if (isset($_GET['getUsrList']))
{
  $codes=array();
  $query = "SELECT usr_email,usr_login_name FROM users";
  $result = $mysqli->prepare($query);
  $result->execute();

  $result->bind_result($usr_email,$usr_login_name);
  while ($result->fetch())
  {
    $codes['mail'][] = $usr_email;
    $codes['name'][] = $usr_login_name;

  }
  echo json_encode($codes);
  $result->close();
}

else if ($_GET['action']=='validateEmailName')
{
  $returnValue="Username or Email is invalid";

  if (isset($_POST['data'])){
    $data=json_decode(urldecode($_POST['data']),true);
    if(strlen($data['uemail'])<=0 || strlen($data['ulogin'])<=0){
      echo json_encode($returnValue);
      die();
    }
  }else{
    echo json_encode($returnValue);
    die();
  }

  $returnValue="";
  $query = "SELECT usr_email FROM users WHERE LOWER(usr_email) = LOWER(?)";
  $result = $mysqli->prepare($query);
  $result->bind_param('s',$data['uemail']);
  $result->execute();
  $result->store_result();
  if($result->num_rows>0)
    $returnValue.="Email already exists";

  $result->close();

  $query = "SELECT usr_login_name FROM users WHERE LOWER(usr_login_name)=LOWER(?)";
  $result = $mysqli->prepare($query);
  $result->bind_param('s',$data['ulogin']);
  $result->execute();
  $result->store_result();
  if($result->num_rows>0){
    if(strlen($returnValue)>0) $returnValue.=", ";
    $returnValue.="Username already exists";
  }

  echo json_encode($returnValue);
  $result->close();
}

$mysqli->close();