import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import camera from '../components/static/camera.png'
import cancel from '../components/static/cancel.png'
import {MEDIA_QUERY_SM, MEDIA_QUERY_MD} from '../breakpoints'

const CancelIcon = styled.div `
position:absolute;
width:20px;
height:20px;
background-image:url(${cancel});
background-size:cover;
margin:5px;
display:block;
&:hover {
	cursor:pointer;
}
`

const Wrapper = styled.div `
display:inline-block;
margin:16px;
${MEDIA_QUERY_MD} {
	margin:12px;
}
${MEDIA_QUERY_SM} {
	margin:6px;
}
`

const PhotoWrapper = styled.label `
width:220px;
height:300px;
display:inline-block;
background-color:rgba(240,240,240, 0.7);
border-radius:8px;
border:0;
background-image:url(${camera});
background-position:center;
background-size:initial;
background-repeat:no-repeat;
&:hover {
	cursor:pointer;
}
${MEDIA_QUERY_MD} {
	width:30vw;
	height:20vh;
}
${MEDIA_QUERY_SM} {
	width:30vw;
	height:20vh;
}
`

const PhotoInput = styled.input `
display:none;
`

export default function PhotoWrapperSection ({photo, dataRef }) {
	const photoWrapperRef = useRef(null)
	const photoInputRef = useRef(null)
	const [isUpload, setIsUpload] = useState(false)

	const onCancel = (photoWrapperRef) => {
		photoWrapperRef.current.style.backgroundImage = ''
		photoWrapperRef.current.style.backgroundSize = 'initial'
		setIsUpload(false)
		
	}

	const onImageUpload = (id) => {
		const reader = new FileReader()
		reader.readAsDataURL(photoInputRef.current.files[0])
		reader.addEventListener('load', () => {
			const uploaded_result = reader.result
			photoWrapperRef.current.style.backgroundImage = `url(${uploaded_result})`
			photoWrapperRef.current.style.backgroundSize = 'cover'
			photoWrapperRef.current.style.backgroundPosition = 'center'
		})
		dataRef.current[`image_${id+1}`] = photoInputRef.current.files[0]
		setIsUpload(true)
	}

	return (
		<Wrapper>
			{isUpload ? <CancelIcon onClick={() => onCancel(photoWrapperRef)}/> : null}					
			<PhotoWrapper ref={photoWrapperRef}>
				<PhotoInput ref={photoInputRef} onChange={() => onImageUpload(photo)} type='file' accept='image/png, image/jpg'></PhotoInput>
			</PhotoWrapper>
		</Wrapper>
	)
}