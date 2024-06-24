import React, { useState, useEffect, useContext } from 'react';
import Sticker from './Sticker';
import { EditorContext } from '@/components/EditorContext';

function Group({ notes }) {
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    const [notesArr, setNotesArr] = useState(localNotes ? localNotes : []);
    const { editorInstanceRef } = useContext(EditorContext);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notesArr));
    }, [notesArr]);

    const handleEdit = async () => {
        notesArr.forEach(note => {
            editorInstanceRef.current.render({
                blocks: note.blocks,
            });
        });
    };

    const handleSave = (data) => {
        console.log('Saved data:', data);
        // Perform any further actions with the saved data
    };

    return (
        <div className={`max-w-[100%] ${notes ? 'h-[20rem]' : 'h-[16rem]'} flex gap-5 flex-wrap ${notes && notes.length > 3 ? 'overflow-y-scroll' : ''} scrollbar`} style={{ maxHeight: '80rem', overflowY: 'auto' }}>
            {notes && notes.length > 0 ? (
                notes.map(note => (
                    <Sticker
                        key={note.user_id}
                        title={note.title}
                        description={note.content}
                        id={note.user_id}
                        date={note.updated_date}
                        onSave={handleSave} // Pass onSave callback
                    />
                ))
            ) : (
                <div>No notes available</div>
            )}
            <button onClick={handleEdit}>Edit Notes</button>
        </div>
    );
}

export default Group;
