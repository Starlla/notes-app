const fs = require('fs');
const chalk = require('chalk')

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNote = notes.find((note)=> note.title ===title)

  if(!duplicateNote){
    notes.push({
      title, body
    })
    saveNotes(notes)
    console.log('New note added!')
  } else{
    console.log('Note title taken!')
  }
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = function (title){
  
  const notes = loadNotes()
  const filteredNotes = notes.filter(function(note) {
    return note.title !== title
  })
  if(notes.length > filteredNotes.length){
    saveNotes(filteredNotes);
    console.log(chalk.green.inverse(`removing ${title}`))
  } else{
    console.log(chalk.red.inverse(`${title} does not exist`))
  }
}

const listNotes = () =>{
  console.log(chalk.green.inverse('Your notes'))
  const notes = loadNotes();
  notes.forEach((note)=>{
    console.log(chalk.blue(note.title))
  })
}

const readNote = (title)=>{
const notes = loadNotes();
const note = notes.find(note=>note.title === title);
if(note){
  console.log(chalk.green.inverse(note.title))
  console.log(note.body)
} else{
  console.log(chalk.red.inverse('Note not found'));
}
}

module.exports = {
   addNote, removeNote, listNotes, readNote
}