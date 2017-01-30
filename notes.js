const fs = require('fs');

var fetchNotes = () =>{
    try{
        var filedata = fs.readFileSync('note-data.json');
        return JSON.parse(filedata);
    }
    catch(e){    
        return [];
    }
}

var saveNotes = (notes) =>{
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
}

var addNote = (title, body) =>{
    var notes = fetchNotes();
    var note = {
        title,
        body
    }; 

    var duplicateNotes = notes.filter((note) =>note.title === title);

    if(duplicateNotes.length === 0)
    {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    else{
        console.log('Notes with same title already exists');
    }
    
};

var getAll = () =>{
    return fetchNotes();
}

var removeNote = (title) =>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

var readNote = (title) =>{
    var notes = fetchNotes();
    var filterNote = notes.filter((note) => note.title === title);
    if(filterNote){
        return filterNote[0];
    }
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote
}