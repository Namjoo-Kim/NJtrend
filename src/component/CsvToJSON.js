import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { DatePicker, message } from 'antd';
// import 'antd/dist/antd.css';
// import '../index.css';


export function CsvToJSON(csv_string, sep){
  const seperator = sep === ""?',':sep
  const enter = seperator===','?"\r\n":"\n";
  const rows = csv_string.split(enter);

  // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
  // const rows = csv_string.split("\r\n");
  
  // 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용
  // const rows = csv_string.split("\n");

  // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
  const jsonArray = [];

  // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장
  const header = rows[0].split(seperator);
  
  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for(let i = 1; i < rows.length; i++){

      // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
      let obj = {};
      // 각 내용 행을 콤마로 구분
      let row = rows[i].split(seperator);
      // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
      for(let j=0; j < header.length; j++){
          obj[header[j]] = row[j];
      }
      // 각 내용 행의 객체를 jsonArray배열에 담기
      jsonArray.push(obj);
  }
  // 5. 완성된 JSON 객체 배열 반환
  return jsonArray;
  // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
  // return JSON.stringify(jsonArray);
}


// export const SomeCom1 = () => {
//   const [date, setDate] = useState(null);
//   const handleChange = value => {
//     message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
//     setDate(value);
//   };
//   return (
//     <div style={{ width: 400, margin: '100px auto' }}>
//       <DatePicker onChange={handleChange} />
//       <div style={{ marginTop: 16 }}>
//         Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
//       </div>
//     </div>
//   );
// }


// export const SomeCom2 = () => {


//   const handleFile = (e) => {
//     const content = e.target.result;
//     // console.log('file content',  content)

//     const string_csv = content.toString();
//     const arr_json = CsvToJSON(string_csv);

//     console.log(arr_json)

//     // You can set content in state and show it in render.
//   };

//   const handleChangeFile = (file) => {
//     let fileData = new FileReader();
//     fileData.onloadend = handleFile;
//     fileData.readAsText(file);
//   };

  
  
//   return(
//     <div>
//         <input type="file" accept=".csv" onChange={e => 
//             handleChangeFile(e.target.files[0])} /> 
//     </div>
//   )

// };


