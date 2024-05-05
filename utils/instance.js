export async function getFetchInstance(email ,method,title) {
    try {
        const response = await fetch(`/api/note/getNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                method: method,
                title:title
            }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error in response:', response.statusText);
            return "";
        }
    }
    catch (error) {
        console.error(`Error in ${method} ---${error.message}`);
    }
}

export async function toggleFetchInstance(noteId, method) {
    try {
        const response = await fetch(`/api/note/setNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                noteId: noteId,
                method: method
            }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error in response:', response.statusText);
            return "";
        }
    }
    catch (error) {
        console.error(`Error in ${method} ---${error.message}`);
    }
}

