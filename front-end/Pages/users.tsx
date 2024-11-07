import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Backofficemodulescss from 'dist/css/Backoffice.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addUsers, editUsers, loadUsers, removeUsersrecord, searchUsers } from '../store/actions/usersActions'
import { IUsersItem } from '../store/models'
import { IState } from '../store/reducers/index'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const AlumnosyTutores: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataUsers = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Role: '',
  }
  const [Usersdata, setUsersData] = React.useState<any>(initialDataUsers)
  const handleUsersChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setUsersData({
      ...Usersdata,
      [name]: value,
    })
  }
  const usersData = useSelector((state: IState) => state.users)
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const theme = Backofficemodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForUsers = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogUsersAction, setdialogUsersAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  authHeaders().then((result) => {
    if (!result) {
      navigation.push('/')
    }
  })

  AuthService.getCurrentUser().then((currentUser) => {
    if (currentUser && currentUser.Role !== 'Admin') {
      props.history.push('/')
    }
  })
  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.back_body}>
          <Sidebar color="Black" open={true}>
            <NavLink exact to="/" key="uz1NSD9K">
              <ListItem button className={classes.itemLink}>
                <ListItemText>
                  <picture>
                    <img
                      className={theme.back_backgroud_link_aptugo}
                      src="/img/Logo_Final_sin_fondo.png"
                      alt="/img/Logo_Final_sin_fondo.png"
                      width="165"
                      height="45"
                    />
                  </picture>
                </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/respuestas" key="tcfqLhz5">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Respuestas a las preguntas</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/preguntas" key="JPH51iWQ">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Preguntas A Responder</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/users" key="02HKeFLv">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Alumnos y Tutores</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/clases" key="3tlVGsTU">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Clases por unidad</ListItemText>
              </ListItem>
            </NavLink>
          </Sidebar>
          <div title="div" className={theme.back_content}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Listado de Usersrecord</Typography>
              </div>

              <Paper square>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar registros de usuarios"
                      margin="dense"
                      size="small"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForUsers}
                    />

                    <LocalAddDialog
                      isOpen={dialogUsersAction !== ''}
                      onOpen={() => setdialogUsersAction('add')}
                      onSave={() => setdialogUsersAction('')}
                      onClose={() => setdialogUsersAction('')}
                      action={dialogUsersAction}
                      addOptions={{ title: 'Agregar Usersrecord', text: 'Introducir Usersrecord', button: 'Agregar' }}
                      editOptions={{ title: 'Editar Usersrecord', text: 'Actualizar Usersrecord', button: 'Editar' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IUsersItem) => {
                        if (dialogUsersAction === 'delete') {
                          dispatch(removeUsersrecord(data))
                        } else {
                          dialogUsersAction === 'add' ? dispatch(addUsers(data)) : dispatch(editUsers(data))
                        }
                      }}
                      color="primary"
                      data={Usersdata}
                      initialData={initialDataUsers}
                      setData={setUsersData}
                      allowMultipleSubmit={dialogUsersAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_FirstName'}
                        variant="standard"
                        value={Usersdata.FirstName || ''}
                        onChange={handleUsersChange('FirstName')}
                        error={usersData?.errField === 'FirstName'}
                        helperText={usersData?.errField === 'FirstName' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Apellido"
                        type="text"
                        fullWidth
                        className={'field_LastName'}
                        variant="standard"
                        value={Usersdata.LastName || ''}
                        onChange={handleUsersChange('LastName')}
                        error={usersData?.errField === 'LastName'}
                        helperText={usersData?.errField === 'LastName' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Correo electrónico"
                        type="text"
                        fullWidth
                        className={'field_Email'}
                        variant="standard"
                        value={Usersdata.Email || ''}
                        onChange={handleUsersChange('Email')}
                        error={usersData?.errField === 'Email'}
                        helperText={usersData?.errField === 'Email' && usersData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={Usersdata.Password}
                        onChange={handleUsersChange('Password')}
                        error={usersData?.errField === 'Password'}
                        helperText={usersData?.errField === 'Password' && usersData.errMessage}
                      />

                      <TextField
                        select
                        margin="dense"
                        label="Role"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Usersdata.Role}
                        onChange={handleUsersChange('Role')}
                      >
                        <MenuItem key="User" value="User">
                          User
                        </MenuItem>
                        <MenuItem key="Admin" value="Admin">
                          Admin
                        </MenuItem>
                      </TextField>
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Apellido', 'Correo electrónico', 'Contraseña', 'Role', 'Actions']}
                      tableData={usersData.foundusers.length ? usersData.foundusers : (usersData.users as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.FirstName} />

                      <Field value={(fieldData: any) => fieldData.LastName} />

                      <Field value={(fieldData: any) => fieldData.Email} />

                      <Field value={'*****'} />

                      <Field value={(fieldData: any) => fieldData.Role} />

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setUsersData(e.element)
                            setdialogUsersAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeUsersrecord(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default AlumnosyTutores
