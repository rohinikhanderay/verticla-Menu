import { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogDelete, blogImageUpload } from '../../../../store/blog/index'
import { Editor } from '@tinymce/tinymce-react'
import { addBlog, editBlog } from '../../../../store/blog/index'
import { LocationSearchInputCities } from '../../../test-locations/LocationSearchInputCities'
import {
  addEvent,
  fetchDetails,
  editEvent,
  eventImageUpload,
} from '../../../../store/event/index'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { WithContext as ReactTags } from 'react-drag-tags-input'
import { numberWithCommas } from '../../../../components/common/commonHelper'
const AddCompany = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const KeyCodes = {
    comma: 188,
    enter: 13,
  }
  const [form, setForm] = useState({
    content: '',
    contentMark: 'both',
    title: '',
    eventTags: [],
    startDate: new Date(),
    endDate: new Date(),
    showRequired: false,
  })
  const [fileUploadProcess, setFileUploadProcess] = useState(false)
  const delimiters = [KeyCodes.comma, KeyCodes.enter]
  const handleDelete = (i) => {
    // setTags(tags.filter((tag, index) => index !== i))
    setForm({
      ...form,
      eventTags: form.eventTags.filter((tag, index) => index !== i),
    })
  }
  const handleAddition = (tag) => {
    //setTags([...tags, tag])
    setForm({
      ...form,
      eventTags: [...form.eventTags, tag],
    })
  }
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...form.tags].slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setForm({
      ...form,
      eventTags: newTags,
    })
    // setTags(newTags)
  }
  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
    // tags[index].id="test"
    // tags[index].text="test"
    //onTagUpdate(index, { id: "test", text: "test" });
  }
  const onClearAll = () => {
    // setTags([])
    setForm({
      ...form,
      eventTags: [],
    })
  }
  // const numberWithCommas = (x) => {
  //   if (x != null) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   } else {
  //     return ''
  //   }
  // }
  const onTagUpdate = (i, newTag) => {
    const updatedTags = form.eventTags.slice()
    updatedTags.splice(i, 1, newTag)
    setForm({
      ...form,
      eventTags: updatedTags,
    })
    // setTags(updatedTags);
  }

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(fetchDetails({ _id: props?.match?.params?.id })).then((res) => {
        let data = res?.data[0]
        if (data.eventTags) {
          data.eventTags = data.eventTags.map((i) => {
            return { id: i, text: i }
          })
        }
        if (data.price) {
          data.price = numberWithCommas(data.price)
        }
        setForm(data)
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

    if (form.eventTags) {
      form.eventTags = form.eventTags.map((i) => i.text)
    }
    // console.log(e.target[7].value)
    // if (
    //   e.target[0].value === '' ||
    //   e.target[6].value === '' ||
    //   e.target[8].value === ''
    // ) {
    //   setForm({
    //     ...form,
    //     showRequired: true,
    //   })
    //   return
    // }

    if (props.match.params.id) {
      dispatch(editEvent(form, props.history))
    } else {
      dispatch(addEvent(form, props.history))
    }
    //history.push('/admin/listEvent')
  }

  //   const handleEditorChange = (content, editor) => {
  //     setForm({
  //       ...form,
  //       content: content,
  //     })
  //   }

  const blogImageUploadHandle = (e) => {
    if (e.target?.files?.length !== 0) {
      setFileUploadProcess(true)
      dispatch(eventImageUpload(e.target?.files)).then((res) => {
        if (res) {
          setFileUploadProcess(false)
          setForm({
            ...form,
            eventImg: res.data,
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
                {props.match.params.id ? 'Edit event.' : 'Create Event'}
              </h1>
              <p className="mt-2 text-gray-500 text-md">
                {props.match.params.id ? 'Edit event.' : 'Post a new event.'}
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
                              Name
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
                              Summary
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                value={form && form?.summary}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    summary: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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

                            {form && form?.eventImg ? (
                              <img
                                src={form?.eventImg?.fullUrl}
                                height="250"
                                width="250"
                              />
                            ) : (
                              ''
                            )}
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                value={form && form?.description}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    description: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              />
                            </div>{' '}
                          </div>

                          <div className="col-span-6 md:col-span-3">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Start Date
                            </label>
                            <div className="mt-1">
                              <DatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    startDate: e,
                                  })
                                }
                                selected={new Date(form?.startDate)}
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              End Date
                            </label>
                            <div className="mt-1">
                              <DatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    endDate: e,
                                  })
                                }
                                selected={new Date(form.endDate)}
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <div className="mt-1 flex items-center ">
                              <span className="w-5 font-semibold">$</span>
                              <input
                                type="text"
                                value={form && form?.price}
                                id="salary"
                                placeholder="10,000"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    price: numberWithCommas(e.target.value),
                                  })
                                }
                              />
                            </div>{' '}
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              URL to teleconference link
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                value={form && form?.teleconferenceLink}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    teleconferenceLink: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="title"
                                value={form && form?.eventPhycialAddress}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    eventPhycialAddress: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Location
                            </label>
                            <div className="mt-1">
                              <LocationSearchInputCities
                                {...props.input}
                                id="location"
                                name="location"
                                autoComplete="address-level2"
                                value={form.location}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    location: e,
                                  })
                                }
                              />
                            </div>{' '}
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Tags
                            </label>
                            <div className="mt-1">
                              {/* <input
                                type="text"
                                name="title"
                                value={form && form?.description}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    title: e.target.value,
                                  })
                                }
                                className="block w-full mt-1 border-gray-300 pb-2 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              /> */}
                              <ReactTags
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                delimiters={delimiters}
                                handleTagClick={handleTagClick}
                                onClearAll={onClearAll}
                                onTagUpdate={onTagUpdate}
                                placeholder="Add tag..."
                                minQueryLength={2}
                                autofocus={false}
                                allowDeleteFromEmptyInput={true}
                                autocomplete={false}
                                readOnly={false}
                                allowUnique={true}
                                allowDragDrop={true}
                                inline={true}
                                allowAdditionFromPaste={true}
                                editable={true}
                                clearAll={true}
                                tags={form.eventTags}
                              />
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link
                      to="/admin/event"
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
