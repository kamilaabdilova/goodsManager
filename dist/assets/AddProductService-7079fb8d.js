import{B as o}from"./index-c7ae716c.js";async function c(r,e,t){console.log("we are in service");const s=await o.post("/product/save",{imageId:r.imageId,price:r.price,description:r.description,categoryId:t,statusId:e});return console.log(s),s}function a(r){return o.post("/product/upload",r)}async function i(){try{return(await o.get("/product/findAll")).data}catch(r){throw console.error("Error adding product:",r),r}}export{c as a,i as g,a as u};
