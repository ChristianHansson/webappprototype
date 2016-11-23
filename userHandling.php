<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>PrototypReklamApp</title>
    <link rel="stylesheet" href="/style/cssreset.css" media="screen" title="no title">
    <link rel="stylesheet" type="text/css" href="style/mainstyle.css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</head>
<body>
  <?php
  include("php/getUser.php");
  getUser();
  echo("#asdasd");
   ?>
<?php echo "hi"; ?>
<div class="reg-wrapper">

  <div class="reg-header">
      <div class="reg-text-head">
        <h1>Registrera</h1>
      </div>
    </div>
<div class="reg-content">

    <input type="text" placeholder="Kommun"/>
    <input type="text" placeholder="Namn"/>
    </div>

    <div class="reg-footer">
        <div class="reg-submit-holder">
            <a href="#"><h3>Registrera</h3></a>
        </div>
        <div class="reg-company-img-wrapper">
            <img src="img/icon/noziaicon.JPG" />
        </div>
    </div>
</div>

<!-- <script src="js/getCategorys.js"></script> -->
<!-- <script src="js/mainjs.js"></script> -->
    </body>
</html>
