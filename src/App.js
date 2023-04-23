import { useEffect, useState } from "react"
import { Auth } from "./components/Auth"
import { db, auth, storage } from "./firebase-config"
import {getDocs, collection, doc, addDoc, deleteDoc, updateDoc} from 'firebase/firestore'
import { ref, uploadBytes } from "firebase/storage"

export const App = () => {
    const [movieList, setMovieList] = useState([])
    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newReleasedDate, setNewReleasedDate] = useState(0)
    const [isNewMovieOscard, setIsNewMovieOscard] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [fileUpload, setFileUpload] = useState(null)

    const movieCollectionRef = collection(db, 'movies')

    const getMovieList = async () => {
        try {
            const data = await getDocs(movieCollectionRef)
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setMovieList(filteredData)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, 'movies', id)
            await deleteDoc(movieDoc)
        } catch (err) {
            console.log(err)
        }
    }

    const updateMovieTitle = async (id) => {
        try {
            const movieDoc = doc(db, 'movies', id)
            await updateDoc(movieDoc, {title: updatedTitle})
        } catch (err) {

        }
    }

    useEffect(() => {
        return getMovieList
    })

    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleasedDate,
                receivedAnOscar: isNewMovieOscard,
                userId: auth?.currentUser?.uid
            })
        } catch (err) {
            console.log(err)
        }
    }

    const uploadFile = async () => {
        try {
            if (!fileUpload) return
            const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
            await uploadBytes(filesFolderRef, fileUpload)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="app">
            Firebase course
            <Auth />

            <div>
                <input placeholder="Movie Title" type="text" onChange={(e) => {setNewMovieTitle(e.target.value)}}/>
                <input placeholder="Released Date" type="number" onChange={(e) => {setNewReleasedDate(Number(e.target.value))}}/>
                <input id="checkbox" type="checkBox" checked={isNewMovieOscard} onChange={(e) => {setIsNewMovieOscard(e.target.checked)}}/>
                <label htmlFor="checkbox">Received An Oscar</label>
                <button onClick={onSubmitMovie}>Submit movie</button>
            </div>

            <div>
                {movieList.map(movie => {
                    return (
                        <div key={movie.id}>
                            <h1 style={{color: movie.receivedAnOscar ? 'red' : 'green'}}>{movie.title}</h1>
                            <h2>{movie.releaseDate}</h2>
                            <h3>{movie.receivedAnOscar ? 'yes' : 'no'}</h3>
                            <button onClick={() => {deleteMovie(movie.id)}}>Delete {movie.title}</button>
                            <input placeholder="New Title" onChange={(e) => setUpdatedTitle(e.target.value)}/>
                            <button onClick={() => {updateMovieTitle(movie.id)}}>Update Title</button>
                        </div>
                    )
                })}
            </div>

            <div>
                <input onChange={(e) => {setFileUpload(e.target.files[0])}} type="file"/>
                <button onClick={uploadFile}>upload file</button>
            </div>
        </div>
    )
}