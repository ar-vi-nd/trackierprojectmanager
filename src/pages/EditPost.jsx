import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import { useNavigate,  useParams } from 'react-router-dom';
import { getProjectById } from '../apirequests/projects';

function EditPost() {
    const [project, setProject] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {

            getProjectById(slug)
            .then((data)=>{
                // console.log(data)
                setProject(data?.data)
            })
            .catch((error)=>{console.log(error)})
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return project ? (
    <div className='py-8'>
        <Container>
            <PostForm project={project} />
        </Container>
    </div>
  ) : null
}

export default EditPost