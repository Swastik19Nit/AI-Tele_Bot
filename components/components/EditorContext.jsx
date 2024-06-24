"use client"
import React, { createContext, useRef } from "react";
import EditorJS from '@editorjs/editorjs';
import ChangeCase from 'editorjs-change-case';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Alert from 'editorjs-alert';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import SimpleImage from "@editorjs/simple-image";
import Image from '@editorjs/image';
import Checklist from '@editorjs/checklist'
import List from "@editorjs/list";
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import Strikethrough from 'editorjs-strikethrough';
import ColorPlugin from 'editorjs-text-color-plugin';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import InlineCode from '@editorjs/inline-code';
export const EditorContext = createContext();

const uploadImagebyFile = () => {
    console.log('Uploading image')
}

const uploadImagebyUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch (err) {
            reject(err)
        }
    })
    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

function EditorContextProvider(props) {
    const editorInstanceRef = useRef(null);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            placeholder: 'Enter your text here...',
            tools: {
                paragraph: {
                    class: Paragraph,
                    tunes: ["textAlignment"]
                },
                embed: {
                    class: Embed,
                    config: {
                        services: {
                            youtube: true,
                            codepen: true,
                        }
                    }
                },
                textAlignment: {
                    class: AlignmentTuneTool,
                    config: {
                        default: "left",
                        blocks: {
                            header: "center"
                        }
                    }
                },
                header: {
                    class: Header,
                    inlineToolbar: true,
                    tunes: ["textAlignment"],
                    config: {
                        placeholder: "Type Heading or sub heading....",
                        levels: [1, 2, 3, 4],
                        defaultLevel: 2
                    }
                },
                inlinecode: {
                    class: InlineCode,
                },
                image: {
                    class: Image,
                    config: {
                        uploader: {
                            uploadByUrl: uploadImagebyUrl,
                            uploadByFile: uploadImagebyFile
                        }
                    }
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
                list: {
                    class: List,
                    inlineToolbar: true
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
                        '#EC7878',
                        '#ABABAB',
                        '#123456',
                        '#789012',
                        '#FEDCBA',
                        '#ABCDEF',
                        '#987654',
                        '#FFFFFF',
                        '#000000',
                        '#FF0000',
                        '#00FF00',
                    ],
                    defaultColor: "#FF1300",
                    customPicker: true,
                }
            },
        });
        editorInstanceRef.current = editor;
        return editor;
    }

    return (
        <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
            {props.children}
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;