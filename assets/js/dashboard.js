mainFunc();
$("input").change(function () {
  mainFunc();  
});
$("#reset").click(function(){ document.getElementById("cha_lv").value = "1";
  document.getElementById("atk_p").value = "0";
  document.getElementById("tal_a").value = "0";
  document.getElementById("ele_mas").value = "0";
  document.getElementById("ele_b").value = "0";
  document.getElementById("dmg_b").value = "0";
  document.getElementById("cri_dmg").value = "50";
  
  document.getElementById("e_lv").value = "1";
  document.getElementById("e_res").value = "10";
  mainFunc();
});

function mainFunc(){  
  chknum("cha_lv",1);
  chknum("atk_p",0);
  chknum("tal_a",0);
  chknum("ele_mas",0);
  chknum("ele_b",0);
  chknum("dmg_b",0);
  chkcri("cri_dmg",50);
  chknum("e_lv",1);
  chknum("e_res",0);
 
  var atk_p = parseFloat($("#atk_p").val());
  var tal_a = parseFloat($("#tal_a").val());
  var em_mas = parseFloat($("#ele_mas").val());
  var ele_b = parseFloat($("#ele_b").val());
  var dmg_b = parseFloat($("#dmg_b").val());
  var re_b = parseFloat($("#re_b").val());
  var cri_dmg = parseFloat($("#cri_dmg").val());
  var cha_lv = parseFloat($("#cha_lv").val());
  var e_lv = parseFloat($("#e_lv").val());
  var e_res = parseFloat($("#e_res").val());
  var e_res_d = parseFloat($("#e_res_d").val());

  if($('#cri_chk').is(":checked")){    
  }else{ cri_dmg = 0;}
  
  var ene_def = eneDEF(cha_lv,e_lv) ; 
  var ele_rec_b = re_b+ele_b;
  var bonus = 1+((ele_rec_b+dmg_b)/100);
  var ene_res =  1-((e_res/100)-(e_res_d/100));
  var dmg = atk_p*(tal_a/100)*ene_def*bonus*ene_res*(1+(cri_dmg/100));
  var scale = scaling(cha_lv);
  vaporize(em_mas,dmg);
  overloaded(em_mas,scale,ele_rec_b,ene_res);
  elecha(em_mas,scale,ele_rec_b,ene_res);
  supcon(em_mas,scale,ele_rec_b,ene_res);
  frozen(em_mas,scale,ele_rec_b,ene_res);
  swirl(em_mas,scale,ele_rec_b,ene_res);
}

function chknum(id,pc){
  var chk = $("#"+id).val();
  if (isNaN(chk) || chk<1) {
    $("#"+id).val(pc);    
  }
}

function chkcri(id,pc){
  var chk = $("#"+id).val();
  if (isNaN(chk) || chk<50) {
    $("#"+id).val(pc);    
  }
}

function eneDEF(c_lv,e_lv){
    c_lv = parseFloat(c_lv)+100;
   e_lv = parseFloat(e_lv)+100;
  return c_lv/(e_lv+c_lv);
}

function vaporize(em,atk){
  //Vaporize  
  var b_vap = 1+((0.189266831*em*Math.exp(-0.000505*em))/100);
  var FtW = (atk*b_vap)*1.5;
  var WtF = (atk*b_vap)*2; document.getElementById("vapFtW").innerHTML = FtW.toFixed(0); document.getElementById("vapWtF").innerHTML = WtF.toFixed(0);
 document.getElementById("melItF").innerHTML = WtF.toFixed(0); 
  document.getElementById("melFtI").innerHTML = FtW.toFixed(0); 
}

function overloaded(em,scale,ele_b,ene_r){
  //Overloaded  
  var emb = (0.453633528 *em*Math.exp(-0.000505*em))/100;
  var b_emb = 1+emb+(ele_b/100);
  var b_dmg = scale*4;  
  var dmg = (b_emb*b_dmg)*ene_r;
  document.getElementById("overl").innerHTML = dmg.toFixed(0); 
   
}

function elecha(em,scale,ele_b,ene_r){
  //Electro-Charged  
  var emb = (0.453633528 *em*Math.exp(-0.000505*em))/100;
  var b_emb = 1+emb+(ele_b/100);
  var b_dmg = scale*2.402082316;  
  var dmg = (b_emb*b_dmg)*ene_r;
  document.getElementById("elecha").innerHTML = dmg.toFixed(0);
}

function supcon(em,scale,ele_b,ene_r){
  //Superconduct  
  var emb = (0.453633528 *em*Math.exp(-0.000505*em))/100;
  var b_emb = 1+emb+(ele_b/100);
  var b_dmg = scale;  
  var dmg = (b_emb*b_dmg)*ene_r;
  document.getElementById("supcon").innerHTML = dmg.toFixed(0);
}

function frozen(em,scale,ele_b,ene_r){
  //Frozen  
  var emb = (0.453633528 *em*Math.exp(-0.000505*em))/100;
  var b_emb = 1+emb+(ele_b/100);
  var b_dmg = scale*3;  
  var dmg = (b_emb*b_dmg)*ene_r;
  document.getElementById("frozen").innerHTML = dmg.toFixed(0);
}

function swirl(em,scale,ele_b,ene_r){
  //Swirl
  var emb = (0.453633528 *em*Math.exp(-0.000505*em))/100;
  var b_emb = 1+emb+(ele_b/100);
  var b_dmg = scale*1.198944574;  
  var dmg = (b_emb*b_dmg)*ene_r;
  document.getElementById("swirlF").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlW").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlI").innerHTML = dmg.toFixed(0);
  document.getElementById("swirlE").innerHTML = dmg.toFixed(0);
}

function scaling(lvl){
  if(lvl>90){
    b_dmg = (lvl/90)*487;
  }
  else if(lvl>=80){
    var min = 424;
    var max = 487;
    var per = (lvl-80)/10;
    b_dmg = min+(per*(max-min));    
  }
  else if(lvl>=70){
    var min = 321;
    var max = 424;
    var per = (lvl-70)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=60){
    var min = 222;
    var max = 321;
    var per = (lvl-60)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=50){
    var min = 145;
    var max = 222;
    var per = (lvl-50)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=40){
    var min = 94;
    var max = 145;
    var per = (lvl-40)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=30){
    var min = 60;
    var max = 94;
    var per = (lvl-30)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=20){
    var min = 36;
    var max = 60;
    var per = (lvl-20)/10;
    b_dmg = min+(per*(max-min));
  }
  else if(lvl>=10){
    var min = 16;
    var max = 36;
    var per = (lvl-10)/10;
    b_dmg = min+(per*(max-min));
  } 
  else if(lvl<10){
    var min = 7;
    var max = 16;
    var per = lvl/10;
    b_dmg = min+(per*(max-min));
  }
  return b_dmg;
}