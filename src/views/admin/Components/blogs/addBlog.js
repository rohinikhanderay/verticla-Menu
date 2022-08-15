import { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogDelete, blogImageUpload } from '../../../../store/blog/index'
import { Editor } from '@tinymce/tinymce-react'
import { addBlog, fetchDetails, editBlog } from '../../../../store/blog/index'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const AddCompany = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [fileUploadProcess, setFileUploadProcess] = useState(false)

  const [form, setForm] = useState({
    content: '',
    contentMark: 'both',
    title: '',
    publishDate: new Date(),
    showRequired: false,
  })

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(fetchDetails({ _id: props?.match?.params?.id })).then((res) => {
        console.log('====', res)
        setForm(res?.data[0])
      })
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (e.target[0].value === '') {
      setForm({
        ...form,
        showRequired: true,
      })
      return
    }
    if (props.match.params.id) {
      dispatch(editBlog(form, props.history))
    } else {
      dispatch(addBlog(form, props.history))
    }
    /// history.push('/admin/listBlogs')
  }

  const handleEditorChange = (content, editor) => {
    setForm({
      ...form,
      content: content,
    })
  }

  const blogImageUploadHandle = (e) => {
    if (e.target?.files?.length !== 0) {
      setFileUploadProcess(true)
      dispatch(blogImageUpload(e.target?.files)).then((res) => {
        if (res) {
          setFileUploadProcess(false)
          setForm({
            ...form,
            blogImg: res.data,
          })
        }
      })
    }
  }

  const blogMarkHadle = (e) => {
    setForm({
      ...form,
      contentMark: e.target.value,
    })
  }
  return (
    <>
      <Layout>
        {' '}
        <div>
          <div className="max-w-3xl px-8 mx-auto mt-12 mb-24 sm:px-2 md:px-4 font-inter">
            <main className="">
              <h1 className="text-3xl font-bold leading-tight tracking-wide text-gray-700 font-baskerville">
                {props.match.params.id ? 'Edit blog.' : 'Create Blog'}
              </h1>
              <p className="mt-2 text-gray-500 text-md">
                {props.match.params.id ? 'Edit blog.' : 'Post a new blog.'}
              </p>
              <form onSubmit={submit} className="mt-12 ">
                <div className="px-4 py-5 bg-white border-t-8 border-teal-600 shadow sm:rounded-lg sm:p-6">
                  <div className="md:grid  md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 ">
                            {form.showRequired ? (
                              <p className="block text-sm font-medium text-red-500">
                                {' '}
                                Required{' '}
                              </p>
                            ) : (
                              ''
                            )}
                            <label
                              htmlFor="positionTitle"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Title
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                value={form && form?.title}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    title: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Content
                            </label>
                            <div className="mt-1">
                              <Editor
                                value={
                                  form?.description || (form && form?.content)
                                }
                                apiKey={`${process.env.REACT_APP_TINYMCE_KEY}`}
                                init={{
                                  height: 500,
                                  menubar: false,
                                  plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                  ],
                                  toolbar:
                                    'undo redo | formatselect | bold italic underline | code|\
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat |link|unlink| help',
                                }}
                                onEditorChange={handleEditorChange}
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="positionTitle"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Image
                            </label>
                            <div className="mt-1 mb-3">
                              {' '}
                              <input
                                onChange={(e) => blogImageUploadHandle(e)}
                                type="file"
                                className="block w-full mt-1 border-gray-300 pb-3 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              />
                            </div>

                            {form && form?.blogImg ? (
                              <img
                                src={form?.blogImg?.fullUrl}
                                height="250"
                                width="250"
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="col-span-6 py-2">
                            <label
                              htmlFor="positionTitle"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Content Mark
                            </label>
                            <div className="flex mt-1">
                              <div className="mr-3">
                                <input
                                  type="radio"
                                  name="type"
                                  value="jobSeeker"
                                  className="mr-2 text-teal-600"
                                  onChange={(e) => {
                                    blogMarkHadle(e)
                                  }}
                                  checked={
                                    form.contentMark === 'jobSeeker'
                                      ? true
                                      : false
                                  }
                                />

                                <label for="jobSeeker">JobSeeker</label>
                              </div>
                              <div className="mr-3">
                                <input
                                  type="radio"
                                  value="recruiter"
                                  name="type"
                                  className="mr-2 text-teal-600"
                                  onChange={(e) => {
                                    blogMarkHadle(e)
                                  }}
                                  checked={
                                    form.contentMark === 'recruiter'
                                      ? true
                                      : false
                                  }
                                />
                                <label for="recruiter">recruiter</label>
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  value="both"
                                  name="type"
                                  className="mr-2 text-teal-600"
                                  checked={
                                    form.contentMark === 'both' ? true : false
                                  }
                                  onChange={(e) => {
                                    blogMarkHadle(e)
                                  }}
                                />
                                <label for="both">Both</label>
                              </div>
                            </div>
                            <div className="mt-5 col-span-6 md:col-span-3">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Publish Date
                              </label>
                              <div className="mt-1">
                                <DatePicker
                                  showTimeSelect
                                  dateFormat="Pp"
                                  className="block border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      publishDate: e,
                                    })
                                  }
                                  selected={new Date(form?.publishDate)}
                                />
                              </div>{' '}
                            </div>
                            <div className="col-span-6 md:col-span-3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link
                      to="/admin/blog"
                      className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className={`inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                        fileUploadProcess ? 'fileUploadProcess' : ''
                      }`}
                    >
                      {props.match.params.id ? 'Update' : 'Post'}
                    </button>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default AddCompany
