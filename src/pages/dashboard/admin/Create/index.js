import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { MultiSelect } from 'primereact/multiselect';
import { listDepartements, listEmbeddeds, listUserById, registerUsersForm, updateUsersForm } from '../../../../utils/moxAxios';
import { MySwal } from '../../../../utils';
import { Button } from 'react-bootstrap';
import { generateIds } from '../../../../config/role';
import { API_POINT } from '../../../../config/api';
import { MdAdminPanelSettings } from 'react-icons/md';
        

const initialForm = {
  id      : "",
  username: "",
  email   : "",
  password: "",
  slug    : "",
  code    : "",
  passCode: "",
}

const sw = new MySwal();
const Create = () => {
  const {viewType, id=''}=useParams()
  const navigate = useNavigate()

  const[load, setLoad]=useState(false)
  const[init,setInit]=useState(true)
  const[dataForm,setDataForm]=useState({...initialForm})
  const[validation,setValidation]=useState({...initialForm})
  const[option, setOption]=useState([])
  const[dataDepa, setDataDepa]=useState([])
  const[dataEmbe, setDataEmbe]=useState([])
  const[multiSelect, setMultiSelect]=useState([])

  const onChangeSelect = useCallback((e)=>{
    const {value}=e;
    setMultiSelect(value)
  },[])
  const groupedItemTemplate = (option)=>{
    return (
      <div className="d-flex align-items-center">
          <div>{option.label}</div>
      </div>
  );
  }
  const handleChange = useCallback((e)=>{
    const {name, value}=e.target;
    setDataForm((old)=>({...old, [name]: value}))
    if(name==='username') setValidation((old)=>({...old, username: ""}))
    if(name==='email') setValidation((old)=>({...old, email: ""}))
    if(name==='password') setValidation((old)=>({...old, password: ""}))
    if(name==='code') setValidation((old)=>({...old, code: ""}))
  },[])
  const handleSubmit = useCallback(async()=>{
    if(!dataForm.username || !dataForm.email || !dataForm.password || !dataForm.code){
      setValidation({
        username: !dataForm.username ? 'Data cannot be empty' :"",
        email   : !dataForm.email ? 'Data cannot be empty': "",
        password: !dataForm.password ? 'Data cannot be empty': "",
        code    : !dataForm.code ? 'Data cannot be empty': "",
      })
      return sw.warning('Data cannot be empty');
    }
    sw.loading()
    const listEmbe = dataEmbe.filter(f=>multiSelect.includes(f.id));
    const newState = [...new Set(listEmbe.map(d=>d.attributes.slugDepartement))]
    const listDepa = dataDepa.filter(f=>newState.includes(f.attributes.slug));
    const genCode = generateIds('USER')
    var payload = {
      username      : dataForm.username,
      email         : dataForm.email,
      passCode      : dataForm.password,
      password      : dataForm.password,
      code          : dataForm.code || 'USER', 
      role          : 2,
      departementId : listDepa.map(d=>d.id),
      embeddedId    : multiSelect,
    }
    var res;
    if(viewType === 'edit'){
      payload={
        ...payload,
        id            : Number(id) 
      }
      res = await updateUsersForm(payload);
    }else{
      payload = {
        ...payload,
        slug          : genCode,
      }
      res = await registerUsersForm(payload);
    }
    sw.close();
    if(!res) return sw.warning('Something when wrong')
    if(res.code !== '1') return sw.warning(res.msg || 'Failed')
    else{
      sw.success(`${res.msg} ${res.user}` || 'Success');
      window.location.href = `${API_POINT}admin`;
    }
  },[dataEmbe, dataDepa, multiSelect, dataForm, registerUsersForm, id, viewType])
  const getData = useCallback(async()=>{
    setLoad(true)
    sw.loading()
    const listDepa = await listDepartements()
    const listEmbed = await listEmbeddeds()

    if(!listDepa || !listEmbed) return sw.warning(`${listDepa.msg}${listEmbed.msg}`);
    if(listDepa.code !== "1" || listEmbed.code !== '1') return sw.warning('Data Option Not Found');
    else{
      const list = listDepa.data.map((d,i)=>{
        const fonds = listEmbed.data.filter(f=>f.attributes.slugDepartement === d.attributes.slug);
        return{
          id   : d.id,
          label: d.attributes.name || '',
          code : d.attributes.slug || '',
          items: fonds.map(item=>{
            return{
              label: item.attributes.name,
              value: item.id,
              data: {
                id  : item.id,
                slug: item.attributes.slugDepartement
              } 
            }
          })
        }
      })
      setOption(list)  
    }
    if(!id){
      sw.close();
      setLoad(false)
      setDataDepa(listDepa.data)
      setDataEmbe(listEmbed.data)
    }
    else {
      const res = await listUserById(id);
      setLoad(false)
      sw.close();
      if(!res) return sw.warning('Something when wrong');
      if(res.code !== '1') return sw.warning(res.msg || 'Failed')
      else{
        setDataForm((old)=>{
          return{
            ...old,
            id      : id,
            username: res.data.username || "",
            email   : res.data.email    || "",
            password: res.data.passCode || "",
            code    : res.data.code     || "",
          }
        })
        const listCheckEmbe = res.data.embeddedId.length && res.data.embeddedId.map(d=>({id: d.id, slugDepartement: d.slugDepartement})) || [];
        setMultiSelect(listCheckEmbe.map(d=>d.id) || [])
        setDataDepa(listDepa.data)
        setDataEmbe(listEmbed.data)
      }
    }
  },[id])

  useEffect(()=>{
    if(init){
      setInit(false)
      getData()
    }
  },[init])
  useEffect(()=>{
    if(viewType){
      if(!['create', 'edit'].includes(viewType)) navigate('/*')
    }
  },[viewType])
  return (
    <Wrapper>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-3">
          <button type='button' className='toggle-btn btn text-danger' >
                <div className=''>
                    <h3 className='logo-text fw-bold'>{viewType} User<MdAdminPanelSettings /></h3>
                    <span className="form-text text-muted">
                      Data Form {viewType}
                    </span>
                </div>                  
          </button>
          {/* <div>
              <h3 className="card-label fw-bold">{viewType} User</h3>
              <span className="form-text text-muted">
                  Data Form {viewType}
              </span>
          </div> */}
      </div>
      <hr style={{height: "10px"}}/>
      <div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='username'>User Name</label>
          <input className='form-control' id='username' name='username' value={dataForm.username} onChange={(e)=>handleChange(e)} />
          {validation.username && 
          <div className='text-end'>
            <label className='text-danger m-0' htmlFor='username'>{validation.username}</label>
          </div>}
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input className='form-control' id='email' name='email' value={dataForm.email} onChange={(e)=>handleChange(e)} />
          {validation.email && 
          <div className='text-end'>
            <label className='text-danger m-0' htmlFor='email'>{validation.email}</label>
          </div>}
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input className='form-control' id='password' name='password' value={dataForm.password} onChange={(e)=>handleChange(e)} />
          {validation.password && 
          <div className='text-end'>
            <label className='text-danger m-0' htmlFor='password'>{validation.password}</label>
          </div>}
        </div>
        <div className='mb-5'>
          <label className='form-label' htmlFor='code'>Role</label>
          <input className='form-control' id='code' name='code' value={dataForm.code} onChange={(e)=>handleChange(e)}/>
          {validation.code &&
          <div className='text-end'>
            <label className='text-danger m-0' htmlFor='code'>{validation.code}</label>
          </div>}
        </div>
        <label className='form-label' htmlFor='embedded'>Get Embedded</label>
        <div className='card flex justify-content-center mb-3'>
          <MultiSelect value={multiSelect} options={option}  onChange={(e) => onChangeSelect(e)}
            optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" name='checked' optionGroupTemplate={groupedItemTemplate}
            placeholder="Select Embedded" display="chip" className="w-full md:w-20rem" id='embedded'
          />
        </div>
        <div className='text-end'>
          <Button className='btn btn-secondary px-4 me-3' onClick={()=>navigate('/admin')}>Back</Button>
          <Button className='btn btn-danger px-4' onClick={()=>handleSubmit()}>Save</Button>
        </div>
      </div>
    </Wrapper>
  )
}

export default Create