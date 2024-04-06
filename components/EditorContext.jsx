"use client";
import React, { createContext, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import ChangeCase from "editorjs-change-case";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Alert from "editorjs-alert";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Image from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import Strikethrough from "editorjs-strikethrough";
const ColorPlugin = require('editorjs-text-color-plugin');
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import InlineCode from "@editorjs/inline-code";
import AttachesTool from "@editorjs/attaches";
import Table from '@editorjs/table'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { storages } from "@/utils/firebase.config";

export const EditorContext = createContext();

const uploadFileToFirebase = async (file) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const downloadURL = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });

    return {
      success: 1,
      file: {
        url: downloadURL,
      },
    };
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    return {
      success: 0,
      file: null,
    };
  }
};

function EditorContextProvider(props) {
  const editorInstanceRef = useRef(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Enter your text here...",
      tools: {
        paragraph: {
          class: Paragraph,
          tunes: ["textAlignment"],
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        textAlignment: {
          class: AlignmentTuneTool,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: "Type Heading or sub heading....",
            levels: [1, 2, 3, 4],
            defaultLevel: 2,
          },
        },
        inlinecode: {
          class: InlineCode,
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile: uploadFileToFirebase,
            },
          },
        },
        attaches: {
          class: AttachesTool,
          config: {
            uploader: {
              uploadByFile: uploadFileToFirebase,
            },
          },
        },
        alert: {
          class: Alert,
        },
        changeCase: {
          class: ChangeCase,
        },
        checklist: {
          class: Checklist,
        },
        Color: {
          class: ColorPlugin,
          config: {
             colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
             defaultColor: '#FF1300',
             type: 'text', 
             customPicker: true // add a button to allow selecting any colour  
          }     
        },
        Marker: {
          class: ColorPlugin, 
          config: {
             defaultColor: '#FFBF00',
             type: 'marker',
             icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
            }       
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        underline: {
          class: Underline,
        },
        strikethrough: {
          class: Strikethrough,
        },
        changeCase: {
          class: ChangeCase,
          colorCollections: [
            "#EC7878",
            "#ABABAB",
            "#123456",
            "#789012",
            "#FEDCBA",
            "#ABCDEF",
            "#987654",
            "#FFFFFF",
            "#000000",
            "#FF0000",
            "#00FF00",
          ],
          defaultColor: "#FF1300",
          customPicker: true,
        },
      },
    });
    editorInstanceRef.current = editor;
    return editor;
  };

  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {props.children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;