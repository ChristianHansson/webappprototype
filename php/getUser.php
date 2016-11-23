<?php

function getUser(){
    $string = file_get_contents("categorys.json");
    $json_a = json_decode($string, true);
    print_r($json_a);
}
