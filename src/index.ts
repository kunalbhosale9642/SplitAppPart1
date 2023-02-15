/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });

import {v4 as idGenerator} from "uuid"

//console.log("Hi");
const forms = document.querySelector<HTMLFormElement>(".forms");
// const addMember = document.querySelector<HTMLButtonElement>(".addmember");
const names = document.querySelector<HTMLInputElement>("#name");
const amt = document.querySelector<HTMLInputElement>("#amt");
const maindiv = document.querySelector<HTMLDivElement>(".right-divider")
const calculate = document.querySelector<HTMLButtonElement>("#calculate");
let array_of_childs:childs[] = [];
let array_of_divs=[];
type childs = {
  id:string,
  name:string,
  amt:number,
  payable_amt:number,
  return_amt:number,
}
forms?.addEventListener("submit",e=>{
  e.preventDefault();
  // console.log(names?.value," and id = ",idGenerator());
  if(names?.value=="" || names?.value==null) return
  if(amt?.value=="" || amt?.value==null) return
  const childs:childs = {
    id:idGenerator(),
    name:names.value,
    amt:parseFloat(amt.value),
    payable_amt:0,
    return_amt:0,
  }
  array_of_childs.push(childs);
  names.value="";
  amt.value="";
  display_Array()
})

calculate?.addEventListener("click",e=>{
   //console.log("clicked");
  let totalAmt = 0;
  let indAmt = 0;
  const data = array_of_childs.map(x=>{
    totalAmt = x.amt + totalAmt;
    
  })
  indAmt = totalAmt/array_of_childs.length;
  //console.log(indAmt," and ",array_of_childs.length);
  
  const data2 = array_of_childs.map(x=>{
    if(indAmt<=x.amt){
      x.payable_amt = 0;
      x.return_amt = x.amt-indAmt;
     // console.log("inside if ",x.name," and return amt = ",x.return_amt," and payable amt = ",x.payable_amt);
      
    }
    else{
      x.payable_amt = indAmt-x.amt;
      x.return_amt = 0;
     // console.log(x.name," and return amt = ",x.return_amt," and payable amt = ",x.payable_amt);
    }
    
  })
  display_Cal_Array();
})

function display_Cal_Array(){
  console.log(array_of_childs);
// for (let i = 0; i < array_of_childs.length; i++) {
//   display_Array(); 
// }
display_Array(); 
}

function display_Array(){
  const div = document.createElement("div");
  div.className = "right-inner-divider";
  const namediv = document.createElement("div");
  const amtpaid = document.createElement("div");
  const payableAmt = document.createElement("div");
  const returnAmt = document.createElement("div");
const data =  array_of_childs.map(x=>{
  console.log(x.name," and return amt = ",x.return_amt," and payable amt = ",x.payable_amt);
  namediv.innerText=x.name;
  amtpaid.innerText=x.amt.toString();
  payableAmt.innerText=x.payable_amt.toString();
  returnAmt.innerText=x.return_amt.toString();
  div.append(namediv,amtpaid,payableAmt,returnAmt);
  console.log(div);
  
  maindiv?.append(div);
})


}