import axios from 'axios'
import React, { useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;


export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [location,setLocation]=useState([2,2]);
  const [email,setEmail]=useState(initialEmail);
  const [count,setCount]=useState(initialSteps);
  const [error,setError]=useState();
  
  const index=(Number(((location[1]-1)*3)+location[0]-1))
  
  function getXY(event) {
      
    resetMessage();
     if(event.target.id=="left"){location[0]>1 ? setCount(count+1) & setLocation([location[0]-1,location[1]]):setError("Sola gidemezsiniz")}
     else if(event.target.id=="right"){location[0]<3 ? setCount(count+1) & setLocation([location[0]+1,location[1]]):setError("Sağa gidemezsiniz")}
     else if(event.target.id=="up"){location [1]>1? setCount(count+1) &  setLocation([location[0],location[1]-1]):setError("Yukarıya gidemezsiniz")}
     else if(event.target.id=="down"){location[1]<3? setCount(count+1) & setLocation([location[0],location[1]+1]) : setError("Aşağıya gidemezsiniz")}
     else if(event.target.id=="reset"){ setLocation([location[0]=2,location[1]=2]);setCount(0);setEmail(initialEmail)};
  
  }

   
 
  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
   setEmail(initialEmail)
  
  
  }
  function resetMessage() {
   
    setError(initialMessage)
   }
 

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChange(evt) {
    setEmail(evt.target.value)
   
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const nData={ x: location[0], y: location[1], steps:count, email:email };

 
    axios.post("http://localhost:9000/api/result",nData)
    .then((res)=>{console.log(res.data);reset();
      setError((res.data.message))}).catch((error)=>{setError((error.response.data.message));
  })


    
    
  }

 
  

//console.log(location)
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({location[0]},{location[1]})</h3>
        <h3 id="steps">{count} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        {
        <h3 id="message">{error}</h3>
      }
      </div>
      <div id="keypad">
        <button onClick={(e)=>getXY(e)} id="left">SOL</button>
        <button onClick={(e)=>getXY(e)} id="up">YUKARI</button>
        <button onClick={(e)=>getXY(e)} id="right">SAĞ</button>
        <button onClick={(e)=>getXY(e)} id="down">AŞAĞI</button>
        <button onClick={(e)=>getXY(e)} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" onChange={(e)=>onChange(e)} type="email" value={email}  placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
