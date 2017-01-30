const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes.js')

var titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}

var bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const notesObject = yargs
.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
    title: titleOptions
})
.command('remove', 'Remove the note', {
    title: titleOptions
})
.help()
.argv;

var command = notesObject._[0];

if(command === 'add'){
    var note = notes.addNote(notesObject.title, notesObject.body);
    if(note)
    {
        console.log(`New Note is created \nNote's Title: ${note.title} \nNote's Body: ${note.body}`);
    }
}

else if(command === 'list'){
    var allnotes = notes.getAll();
    if(allnotes){
        allnotes.forEach((note) =>{
        console.log("----------------------");
        console.log(`Title: ${note.title} \nBody: ${note.body}`);
        });
    }
    else{
        console.log('No Note present!')
    }
}

else if(command === 'remove'){
    var noteRemoved = notes.removeNote(notesObject.title);
    var message = noteRemoved ? "Note removed" : "Note not found";
    console.log(message);
}

else if(command === 'read'){
    var note = notes.readNote(notesObject.title);
    if(note){
        console.log(`Note's Title: ${note.title} \nNote's Body: ${note.body}`);
    }
    else{
        console.log('Note Not Found');
    }
}
else{
    console.log(`Command :- ${command}, Not Found!`);
}