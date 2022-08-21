import axios from "axios";
import React,{useEffect,useState} from 'react';

export const Api = () => {

    const [Data,setData]=useState<Array>([])

    axios.get(`/items/item?q=123`)
    .then(res => {
        // console.log(res.data)
        const temp = {
            'te' : res.data.item,
            'go' : res.data.q,
        }
        setData(temp)
    })
    .catch(err => {console.log(err.resposne)})

    return Data

};

export async function GetData() {
    try {
       let res = await axios.get(`/items/item?q=123`);
        if(res.status == 200){
            // test for status you want, etc
            // console.log(res.status)
            // console.log(res.data)
        }    
        // Don't forget to return something   
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

export async function Data(param) {
    try {
        let res = await axios.get("/data/grp",param); // axios <-> instance

        if(res.status == 200){
            // test for status you want, etc
            // console.log(res.status)
            // console.log(res.data)
        }    
        // Don't forget to return something   
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

export async function Insert(param) {
    try {
        let res = await axios.post("/data/insert",param); // axios <-> instance

        if(res.status == 200){
            // test for status you want, etc
            // console.log(res.status)
            // console.log(res.data)
        }    
        // Don't forget to return something   
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}


