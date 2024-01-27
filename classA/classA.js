/**
 * Store the ip to do subnetting
 */
let ip = [];

/* Storing the subnet masks*/
let sub_masks = [9,10,11,12,13,14];
let sub_mask = sub_masks[Math.floor(Math.random() * 6)] 

/* Storing the group sizes for each sub_mask (Hack table that alternates some meaning to the other values in other array)*/
let group_sizes = [128, 64, 32, 16, 8, 4];

/* Storing the hack for the subnets mask id for each sub_mask (Hack table that alternates some meaning to the other values in other array)*/
let subnets = [128, 192, 224, 240, 248, 252];

/* Stores the third octet number for the subnet mask*/
let subnet;

/* Stores the third octet number for the network id, broadcast id, and index at which our information corresponds in the hack table */
let first, last, position;

/**
 * 
 * @returns random number between 0 and 254
 * Supposed to be 255 but just did upto 254 to make it simple
 */
function rand254(){
    let num = Math.floor(Math.random()*255);
    while(group_sizes.indexOf(num) != -1 ){
        num = Math.floor(Math.random() * 255);
    }
    return num;
}

/**
 * Function that generate random IP for us to subnet
 */
function generateIP(){

    ip[0] = Math.floor(Math.random() * 126) + 1;
    ip = [...ip, rand254(), rand254(), rand254()];
}
/* Function call */
generateIP();

/**
 * Function to show the random IP 
 */
function showIP(){
    const getclass = document.getElementById("generateIP");
    let ip_string =  ip[0] + "." + ip[1] + "." + ip[2] + "." + ip[3];

    getclass.innerHTML = "Lets do the subnetting for the " + "<br><span style = 'color: blue; text-decoration : underline; font-size: 30px;'>" + ip_string + " / " +  sub_mask+ "</span><br><br>";
    showform();
}

/**
 * Function to show our form after the random number is displayed to the user
 */
function showform(){
    let form = document.getElementById("form-1");
    form.style.display = "block";
}

/**
 * Function for the default subnet mask
 */
function next0(){
    let default_sub = document.getElementById("subnet_mask").value;
    let feedback_mssg0 = document.getElementById("feedback_mssg0");
    let id_1 = document.getElementById("id_1");

    check(default_sub, "A", feedback_mssg0);
    id_1.style.display = default_sub === "A" ? "block": "none";


}

/**
 * Function for the subnet mask
 */
function next1(){

    let sub_id = document.getElementById("sub_id").value;
    let feedback_mssg1 = document.getElementById("feedback_mssg1");
    let id_1_b = document.getElementById("id_1_b");

    let position = sub_masks.indexOf(sub_mask);
    subnet = subnets[position];
    
    let value = "255." + subnet + ".0.0";
    check(sub_id, value, feedback_mssg1);
    id_1_b.style.display = sub_id === value ? "block": "none";
    
}

/**
 * Function for converting the ip into binary form
 */
function next1_b(){

    let binary_id = document.getElementById("binary_id").value;
    let feedback_mssg1 = document.getElementById("feedback_mssg1_b");
    let id_2 = document.getElementById("id_2");

    let value = parseInt(ip[0], 10).toString(2).padStart(8,'0') + "."+ parseInt(ip[1], 10).toString(2).padStart(8,'0') +  "."+ parseInt(ip[2], 10).toString(2).padStart(8,'0') + "."+ parseInt(ip[3], 10).toString(2).padStart(8,'0');

    console.log(value);
    check(binary_id, value, feedback_mssg1);
    id_2.style.display = binary_id === value ? "block": "none";
    
}

/**
 * Function for the network id address
 */
function next2(){
    let net_id = document.getElementById("net_id").value;
    let feedback_mssg2 = document.getElementById("feedback_mssg2");
    let id_3 = document.getElementById("id_3");

    let i = 0;
    position = sub_masks.indexOf(sub_mask);
    let group_size = group_sizes[position];

    
    while(i<= ip[1]){
        first = i ;
        i = i+ group_size;
    }
    
    let value = ip[0] + "." + first + ".0.0";
    check(net_id, value, feedback_mssg2);

    id_3.style.display =  net_id === value ? "block": "none";
}

/**
 * Function for the broadcast ip address
 */
function next3(){
    let broad_id = document.getElementById("broad_id").value;
    let feedback_mssg3 = document.getElementById("feedback_mssg3");
    let id_4 = document.getElementById("id_4");

    last = first + group_sizes[position] - 1;
    let value = ip[0] + "." + last + ".255.255";

    if((last) >= 256){
        last = 255;
         value = ip[0] + ".255.255.255";
     }

    check(broad_id, value, feedback_mssg3);
    id_4.style.display = broad_id === value ? "block" : "none";
}

/**
 * Function for the first usable host ip address
 */
function next4(){
    let first_id = document.getElementById("first_id").value;
    let feedback_mssg4 = document.getElementById("feedback_mssg4");
    let id_5 = document.getElementById("id_5");

    let value = ip[0] + "." +first + ".0.1";

    check(first_id, value, feedback_mssg4);
    id_5.style.display = first_id === value ? "block" : "none";
}

/**
 * Function for the last usable host ip address
 */
function next5(){
    let last_id = document.getElementById("last_id").value;
    let feedback_mssg4 = document.getElementById("feedback_mssg5");
    let id_6 = document.getElementById("id_6");

    let value = ip[0] + "." + last + ".255.254";

    check(last_id, value, feedback_mssg4);
    id_6.style.display = last_id === value ? "block" : "none";
}

 function next6(){
   let usable_host = document.getElementById("usable_host").value;
   let feedback_mssg6 = document.getElementById("feedback_mssg6");
   let refreshButton = document.getElementById("refreshButton");
   let value = Math.pow(2, (32 - sub_masks[position]))- 2;
 
   check(parseInt(usable_host), value, feedback_mssg6);
   refreshButton.style.display = parseInt(usable_host) === value ? "block": "none";
   
}

/**
 * 
 * @param {String} value 
 * @param {String} correct 
 * @param {Object} div 
 * @param inputId 
 * @param feedback_mssg
 */
function check(value, correct, div){
    if(value === correct){
        div.textContent = "Correct. You did a great job."
        div.style.color = "green";
    }
    else{
        div.textContent = "Incorrect! Try again."
        div.style.color = "red";
       
    }
}

/*********
 * Button Manipulation
 */



/** Answer for the question 1 */
let answer_button_1 = document.querySelector("#answer-button-1");
let answer_1 = document.getElementById("answer-1");

answer_button_1.addEventListener("click", function(event){
    if(answer_1.style.display === "none" || answer_1.style.display === ""){
    answer_1.style.display = "block";
    }else{
        answer_1.style.display = "none";
    }
    event.preventDefault();
} );


/** Answer for the question 2 */
let answer_button_2 = document.querySelector("#answer-button-2");
let answer_2 = document.getElementById("answer-2");

answer_button_2.addEventListener("click", function(event){
    if(answer_2.style.display === "none" || answer_2.style.display === ""){
    answer_2.style.display = "block";
    }else{
        answer_2.style.display = "none";
    }
    event.preventDefault();
} );

/** Answer for the question 3 */
let answer_button_3 = document.querySelector("#answer-button-3");
let answer_3 = document.getElementById("answer-3");

answer_button_3.addEventListener("click", function(event){
    if(answer_3.style.display === "none" || answer_3.style.display === ""){
    answer_3.style.display = "block";
    }else{
        answer_3.style.display = "none";
    }
    event.preventDefault();
} );

/** Answer for the question 4 */
let answer_button_4 = document.querySelector("#answer-button-4");
let answer_4 = document.getElementById("answer-4");

answer_button_4.addEventListener("click", function(event){
    if(answer_4.style.display === "none" || answer_4.style.display === ""){
    answer_4.style.display = "block";
    }else{
        answer_4.style.display = "none";
    }
    event.preventDefault();
} );

/** Answer for the question 5 */
let answer_button_5 = document.querySelector("#answer-button-5");
let answer_5 = document.getElementById("answer-5");

answer_button_5.addEventListener("click", function(event){
    if(answer_5.style.display === "none" || answer_5.style.display === ""){
    answer_5.style.display = "block";
    }else{
        answer_5.style.display = "none";
    }
    event.preventDefault();
} );

/** Answer for the question 6 */
let answer_button_6 = document.querySelector("#answer-button-6");
let answer_6 = document.getElementById("answer-6");

answer_button_6.addEventListener("click", function(event){
    if(answer_6.style.display === "none" || answer_6.style.display === ""){
    answer_6.style.display = "block";
    }else{
        answer_6.style.display = "none";
    }
    event.preventDefault();
} );


/** Answer for the question 7 */
let answer_button_7 = document.querySelector("#answer-button-7");
let answer_7 = document.getElementById("answer-7");

answer_button_7.addEventListener("click", function(event){
    if(answer_7.style.display === "none" || answer_7.style.display === ""){
    answer_7.style.display = "block";
    }else{
        answer_7.style.display = "none";
    }
    event.preventDefault();
} );


let refreshButton = document.getElementById("refreshButton");
// Adding a click event listener to the button
refreshButton.addEventListener("click", function() {
    location.reload();
});
