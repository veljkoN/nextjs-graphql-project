import React, { useState, useRef, useEffect } from 'react'
import { submitComment } from '../services'
const CommentsForm = ({ slug }) => {
    const [ error, setError ] = useState(false)
    const [localeStorage, setLocaleStorage] = useState(null)
    const [showSuccesMessage, setShowSuccesMessage] = useState(false)
    const commetnEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()


    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    }, [])

    const handlecommentSubmission = () => {
        setError(false)
        const { value:comment } = commetnEl.current
        const { value:name } = nameEl.current
        const { value:email } = emailEl.current
        const { checked:storeData } = storeDataEl.current
        if (!comment || !name || !email) {
            setError(true)
            return;    //if all fields are not filled, function will fihished here
        }
        const commentObj = { name, email, comment, slug }   //key-value is the same
        if ( storeData && localeStorage ) {
           localeStorage.setItem('name', name)
           localeStorage.setItem('email', email)
            
        }
        else {
            if (localeStorage) {
                localeStorage.removeItem('name', name)
                localeStorage.removeItem('email', email)

            }
        }
        submitComment(commentObj)
            .then((res) => {
                setShowSuccesMessage(true)
                setTimeout(() => {
                    setShowSuccesMessage(false)
                }, 3000);
            })
    }
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Replay</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea 
                    ref={ commetnEl } 
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
                    placeholder="Comment"
                    name="comment"
                />
                    
               
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
                    placeholder="Name"
                    name="name"
                />
                <input
                        type="text"
                        ref={emailEl}
                        className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
                        placeholder="Email"
                        name="email"
                    />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input ref={storeDataEl} type='checkbox' id='storeData' name='storeData' value={true} />
                    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my name and e-mail for next time I comment.</label>
                </div>
            </div>
            { error && <p className='tet-xs text-red-500'>All field are required.</p>}
            <div className='mt-8'>
                <button 
                    type='button'
                    onClick={ handlecommentSubmission}
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
                >
                    Post Comment
                </button>
                { showSuccesMessage && <span className='text-xl float-right font-semibolc mt-3 text-green-500'>Comment submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
