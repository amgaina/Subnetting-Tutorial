const classes = new Map([["A", 126], ["B", 191], ["C", 223]]);
const showip = document.getElementById("getIp");
const showHosts = document.getElementById("getHosts");

let getValue = "";

let ip = [];

function rand255(){
    return Math.ceil(Math.random()*254 + 1);
}
let num_hosts = rand255();

let subnet = 0;
let host = 0;
let subnet_mask = 0;

function getSelectedValue(){
    ip = [];
    const getclass = document.getElementById("class");
    getValue = getclass.value;
    let val = classes.get(getValue);
    if(getValue == 'A'){
        ip[0] = Math.ceil(Math.random()*val + 1);
    }
    else if(getValue == 'B'){
        ip[0] = Math.ceil(Math.random()*(val - 128)) + 128 ; 
    }
    else if(getValue  == 'C'){
        ip[0] = Math.floor(Math.random() * (val - 192)) + 192;
    }
    ip = [...ip, rand255(), rand255(), rand255()];
    let ip_string =  ip[0] + "." + ip[1] + "." + ip[2] + "." + ip[3];

    showip.innerHTML = "Lets do the subnetting for the " + "<span style = 'color: blue; text-decoration : underline;'>" + ip_string + "</span><br><br>";
    showip.innerHTML += "Lets do the subnetting to create " + "<span style = 'color: blue; text-decoration : underline;'>" + num_hosts + "</span>"+ " subnets.";
}
function getHosts(){
    if(num_hosts <= 1){
        subnet = 1;
        host = 256;
        subnet_mask = 24;
    }
    else if(num_hosts <= 2){
        subnet = 2;
        host = 128;
        subnet_mask = 25;
    }
    else if(num_hosts <= 4){
        subnet = 4;
        host = 64;
        subnet_mask = 26;
    }
    else if(num_hosts <= 8){
        subnet = 8;
        host = 32;
        subnet_mask = 27;
    }
    else if(num_hosts <= 16){
        subnet = 16;
        host = 16;
        subnet_mask = 28;
    }
    else if(num_hosts <= 32){
        subnet = 32;
        host = 8;
        subnet_mask = 29;
    }
    else if(num_hosts <= 64){
        subnet = 64;
        host = 4;
        subnet_mask = 30;
    }
    else if(num_hosts <= 128){
        subnet = 128;
        host = 2;
        subnet_mask = 31;
    }
    else{
        subnet = 256;
        host = 1;
        subnet_mask = 32;
    }
    console.log(subnet_mask + " " + host);


}
getHosts();

