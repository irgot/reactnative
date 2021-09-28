import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import './Preview.css'
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch } from 'react-redux'
import { v4 as uuid } from "uuid";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import firebaseApp from "./_firebase";


function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const dispatch = useDispatch()
    const storage = getStorage(firebaseApp)
    const db = getFirestore(firebaseApp)
    useEffect(() => {
        !cameraImage && history.replace('/')
    }, [cameraImage, history])
    const closePreview = () => {
        dispatch(resetCameraImage())
    }
    const sendPost = () => {
        const id = uuid();
        const imageRef = ref(storage, `posts/${id}`)
        uploadString(imageRef, cameraImage, 'data_url').then((snapshot) => {
            // console.log(snapshot)
            getDownloadURL(snapshot.ref).then((url) => {
                const docRef = doc(collection(db, 'posts'))
                const data = {
                    imageUrl: url,
                    username: 'PAPA React',
                    read: false,
                    timestamp: serverTimestamp()
                }
                setDoc(docRef, data).then(() => {
                    history.replace('/chats')
                })
            })

        }).catch((error) => {
            console.error(error)
        })
        // }).finally(() => {
        //     imageRef.toString
        // })

    }
    return (
        <div className='preview'>
            <CloseIcon onClick={closePreview} className="preview__close" />
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div className="preview__footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon" />
            </div>
        </div>
    )
}

export default Preview
