import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [proText, setProText] = useState('Pro') 
  const [conText, setConText] = useState('Contra') 
  const [gptText, setGptText] = useState('gptText')

  const [frLess, setfrLess] = useState('fraktionslos')
  const [ergebnis, setErgebnis] = useState('ergebnis')
  const [titel,setTitel]=useState('titel')

  const handleSubmit= (event) =>{
    event.preventDefault()
    const titelText ='heute '+ event.target.titel.value
    setTitel(titelText)
    let votes = [
      {
            vote: false,       
            number: 0,
            name:'Grüne'
          },
      {
            vote: false,
            number: 0,
            name:'AFD'
          },
      {
            vote: false,
            number: 0,
            name:'CDU/CSU'
          },
      {
            vote: false,
            number: 0,
            name:'FDP'
          },
      {
            vote: false,
            number: 0,
            name:'Linke'
          },
      {
            vote: false,
            number: 0,
            name:'BSW'
          },
      {
            vote: false,
            number: 0,
            name:'SPD'
          }
        ]
    votes[0].vote=event.target.choicegreen.value
    votes[0].number=event.target.numgreen.value
    votes[1].vote=event.target.choiceafd.value
    votes[1].number=event.target.numafd.value

    votes[2].vote=event.target.choicecdu.value
    votes[2].number=event.target.numcdu.value
    
    votes[3].vote=event.target.choicefdp.value
    votes[3].number=event.target.numfdp.value                        
    
    votes[4].vote=event.target.choicelinke.value
    votes[4].number=event.target.numlinke.value

    votes[5].vote=event.target.choicebsw.value
    votes[5].number=event.target.numbsw.value

    votes[6].vote=event.target.choiceSPD.value
    votes[6].number=event.target.numSPD.value
    
    let frles = {yes:0,no:0}
    frles.yes=event.target.yesfraktionslos.value
    frles.no=event.target.nofraktionslos.value
    console.log(frles)
    function numberToWords(num) {
      const units = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
      const teens = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
      const tens = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
  
      if (num < 10) return units[num];
      if (num >= 10 && num < 20) return teens[num - 10];
      if (num >= 20 && num < 100) {
          return (num % 10 !== 0 ? units[num % 10] + "und" : "") + tens[Math.floor(num / 10)];
      }
      if (num >= 100 && num < 1000) {
          return units[Math.floor(num / 100)] + "hundert " + (num % 100 !== 0 ? numberToWords(num % 100) : "");
      }
  }
  

    const frlesText = (frles)=>{
      return 'Von den Fraktionslosen haben ' + numberToWords(frles.yes) + ' dafür und ' +numberToWords(frles.no) + ' dagegen gestimmt'
    }
    setfrLess(frlesText(frles))

    const yesText = (yes) =>{
      const yestext = yes.map((partei)=>{
        return 'Die ' + partei.name + ' mit ' + numberToWords(partei.number) +' Stimmen ' + '.     '
      })
      return 'dafür gestimmt haben ' + yestext
    }
    const noText = (no) =>{
      const notext = no.map((partei)=>{
        return 'Die ' + partei.name + ' mit ' + numberToWords(partei.number) +' Stimmen ' + '.     '
      })
      return 'dagegen gestimmt haben ' + notext
    }
    


    const ja = votes.filter(item=>item.vote==='yes')
    const nein = votes.filter(item=>item.vote==='no')
    setProText(yesText(ja))
    setConText(noText(nein))
    console.log(ja)
    let totalYesVotes = ja.reduce((sum, current) => sum + Number(current.number), 0) + Number(frles.yes)
    
    let totalNoVotes = nein.reduce((sum, current) => sum + Number(current.number), 0) + Number(frles.no)
    let ergebnisText ='ergebnisTest'
    if (totalNoVotes>totalYesVotes){
      ergebnisText = 'Der Antrag wurde mit ' +numberToWords(totalNoVotes) + ' Stimmen für Nein gegen ' + numberToWords(totalYesVotes)+ ' Stimmen für Ja abgelehnt' 
    } else if (totalNoVotes<totalYesVotes) {
      ergebnisText = 'Der Antrag wurde mit ' +numberToWords(totalYesVotes) + ' Stimmen für Ja gegen ' + numberToWords(totalNoVotes)+ ' Stimmen für Nein akzeptiert'
    }else {
      ergebnisText='fehler'
    }
    setErgebnis(ergebnisText)
  }

  const handleGPT= (event) =>{
    event.preventDefault()
    console.log(event.target.description.value)
    const text = 'Bitte fasse den folgenden Text möglichst kurz und in einfacher Sprache in form eines Textes zusammen und versuche dabei die Reihenfolge des Inhalts wie folgt zu gestalten:1. Wann wurde abgestimmt (bitte mit absoluten angaben, also nicht so etwas wie heute, gestern usw.) 2. Worüber wurde abgestimmt 3. Welchen Grund hat die Abstimmung 4. Weiterer interessanter Inhalt . unabhängig von deinem restlichen text soll der text beginnen mit >'+titel+'<. Hier der Text der zusammen gefasst werden soll: ' + event.target.description.value
    setGptText(text)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="titel" id="titel" />
<div className="parteiInput">
  <p className="parteiName">spd</p>
  <select name="choiceSPD" id="choiceSPD">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numSPD" id="numSPD" />
</div>
<div className="parteiInput">
<p className="parteiName">cdu</p>
  <select name="choicecdu" id="choicecdu">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numcdu" id="numcdu" />
</div>
<div className="parteiInput">
<p className="parteiName">grüne</p>
  <select name="choicegreen" id="choicegreen">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numgreen" id="numgreen" />
</div>
<div className="parteiInput">
<p className="parteiName">fdp</p>
  <select name="choicefdp" id="choicefdp">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numfdp" id="numfdp" />
</div>
<div className="parteiInput">
<p className="parteiName">afd</p>
  <select name="choiceafd" id="choiceafd">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numafd" id="numafd" />
</div>
<div className="parteiInput">
<p className="parteiName">bsw</p>
  <select name="choicebsw" id="choicebsw">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numbsw" id="numbsw" />
</div>
<div className="parteiInput">
<p className="parteiName">linke</p>
  <select name="choicelinke" id="choicelinke">
  <option value="yes">ja</option>
  <option value="no">nein</option>
  </select>
  <input type="number" name="numlinke" id="numlinke" />
</div>
<div className="parteiInput">
<p className="parteiName">fraktionslos</p>
<label htmlFor="yes">ja</label>
  <input type="number" name="yesfraktionslos" id="yesfraktionslos" />
  <label htmlFor="no">nein</label>
  <input type="number" name="nofraktionslos" id="nofraktionslos" />
</div>
<button>submit</button>
    </form>
    <p>erklärung:</p>
    <p>{titel}</p>
    <p>Abstimmung:</p>
    <p>{proText}</p>
    <p>{conText}</p>
    <p>{frLess}</p>
    <p>{ergebnis}</p>

    <form onSubmit={handleGPT}>
      <textarea name="description" id="description"></textarea>
      <button>submit</button>
    </form>
    <p>{gptText}</p>
    </>
  )
}

export default App
