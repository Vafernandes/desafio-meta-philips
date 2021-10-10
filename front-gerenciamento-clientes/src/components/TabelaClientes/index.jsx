import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { apiClientes, apiEndereco } from '../../services/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';


import './styles.css'

const TabelaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const [visible, setVisible] = useState(false);
    const [visibleEndereco, setVisibleEndereco] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        carregarDadosApi()
    }, []);

    const defaultValuesInitialize = () => {
        setCurrentId('')
        setLogradouro('')
        setNumero('')
        setComplemento('')
        setBairro('')
        setCep('')
        setCidade('')
        setEstado('')

        setEnderecos([])

        setValue('nomeCompleto', '')
        setValue('cpf', '')
        setValue('dataNascimento', '')
    }

    const onSubmit = async ({ nomeCompleto, dataNascimento, cpf }) => {
        const cliente = {
            nomeCompleto,
            dataNascimento, //new Intl.DateTimeFormat(['ban', 'id']).format(dataNascimento),
            cpf,
            enderecos
        }

        if(!currentId) {
            await apiClientes.post('', cliente);
        } else {
            const response = await apiClientes.put(`${currentId}`, cliente)
            console.log(response.data)
        }

        await carregarDadosApi()
        setShowDialog(false)
        setEnderecos([])
        toast.current.show({ severity: 'success', summary: 'Criação', detail: 'Registro criado com sucesso!', life: 3000 });
        defaultValuesInitialize()
    };

    const carregarDadosApi = async () => {
        const response = await apiClientes.get();
        setClientes(response.data)
    }

    const cancelarOperacaoDialog = () => {
        defaultValuesInitialize()
        setShowDialog(false)
    }

    const editCliente = async (rowData) => {
        defaultValuesInitialize()
        setCurrentId(rowData.id)
        setShowDialog(true)

        const response = await apiClientes.get(`${rowData.id}`)
        const cliente = response.data

        setValue('nomeCompleto', cliente.nomeCompleto)
        setValue('dataNascimento', cliente.dataNascimento)
        setValue('cpf', cliente.cpf)

        const listaEnderecosTemporario = []

        cliente.enderecos.forEach(endereco => {
            // setLogradouro(endereco.logradouro)
            // setNumero(endereco.numero)
            // setComplemento(endereco.complemento)
            // setBairro(endereco.bairro)
            // setCep(endereco.cep)
            // setCidade(endereco.cidade)
            // setEstado(endereco.estado)

            listaEnderecosTemporario.push(endereco)
        })
        setEnderecos([...enderecos, ...listaEnderecosTemporario]);
    }

    const confirmDeleteCliente = (rowData) => {
        setCurrentId(rowData.id)
        setVisible(true)
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" onClick={() => editCliente(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCliente(rowData)} />
            </>
        );
    }

    const selecioanrEndereco = (rowData) => {
        setVisibleEndereco(true)
        setCurrentId(rowData)
    }

    const confirmDeleteAdress = async () => {
        console.log('currentId', currentId)
        await apiEndereco.delete(`${currentId.id}`)
        setVisibleEndereco(false)
        const response = await apiEndereco.get(`/${currentId.id_cliente}`);
        setEnderecos(response.data)
        setCurrentId('')

        console.log('enderesos apos exlusao', enderecos)

        toast.current.show({ severity: 'success', summary: 'Deletção', detail: 'Registro deletado com sucesso!', life: 3000 });
    }

    const actionBodyTemplateAdress = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" type="button" className="p-button-rounded p-button-info p-mr-2" onClick={() => { }} />
                <Button icon="pi pi-trash" type="button" className="p-button-rounded p-button-warning" onClick={() => selecioanrEndereco(rowData)} />
            </>
        );
    }

    const renderFooterDeleteAdress = () => {
        return (
            <div>
                <Button label="Não" icon="pi pi-times" onClick={() => setVisibleEndereco(false)} className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={() => confirmDeleteAdress()} autoFocus />
            </div>
        );
    }

    const createAdress = () => {
        const constadress = {
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado
        }

        setEnderecos([...enderecos, constadress]);

        setLogradouro('')
        setNumero('')
        setComplemento('')
        setBairro('')
        setCep('')
        setCidade('')
        setEstado('')
    }

    const renderFooterDelete = (name) => {
        return (
            <div>
                <Button label="Não" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={() => accept(name)} autoFocus />
            </div>
        );
    }

    const accept = async () => {
        console.log(currentId)
        await apiClientes.delete(`${currentId}`)
        setVisible(false)
        carregarDadosApi()
        toast.current.show({ severity: 'success', summary: 'Deletção', detail: 'Registro deletado com sucesso!', life: 3000 });
    }


    return (
        <div className="p-d-flex p-flex-column" style={{ margin: 50 }}> 
            <Toast ref={toast} />
            <h1>Gerenciamento de Clientes</h1>
            
            <Card className="p-mb-2">
                <Button
                    label="Cadastrar novo cliente"
                    className="p-button-raised p-button-success"
                    onClick={() => setShowDialog(true)}
                />
            </Card>

            <Card className="p-mb-2">
                <DataTable value={clientes} dataKey="id">
                    <Column field="nomeCompleto" header="Nome Completo"></Column>
                    <Column field="cpf" header="CPF"></Column>
                    <Column field="dataNascimento" header="Data de Nascimento"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </Card>

            <Dialog header="Cadastrar Cliente" visible={showDialog} style={{ width: '80vw' }} onHide={cancelarOperacaoDialog}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-d-flex p-flex-column marginInput">
                        <h2 className="marginLabel">Dados Pessoais</h2>
                        <div className="p-d-flex p-flex-wrap p-mb-2">
                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Nome completo</label>
                                    <InputText {...register('nomeCompleto')} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">CPF</label>
                                    <InputText {...register('cpf')} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Data de Nascimento</label>
                                    <InputText dateFormat="dd/mm/yyyy" mask="99/99/9999" {...register('dataNascimento')} />
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="p-d-flex p-flex-column marginInput">
                        <h2 className="marginLabel">Dados de Endereço</h2>
                        <div className="p-d-flex p-flex-wrap p-mb-2">
                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Logradouro</label>
                                    <InputText value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Número</label>
                                    <InputText value={numero} onChange={e => setNumero(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Complemento</label>
                                    <InputText value={complemento} onChange={e => setComplemento(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Bairro</label>
                                    <InputText value={bairro} onChange={e => setBairro(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">CEP</label>
                                    <InputText value={cep} onChange={e => setCep(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Cidade</label>
                                    <InputText value={cidade} onChange={e => setCidade(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Estado</label>
                                    <InputText value={estado} onChange={e => setEstado(e.target.value)} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <Button
                                    label="Adicionar endereco"
                                    className="p-button-raised p-button-help"
                                    style={{ marginTop: 30 }}
                                    type="button"
                                    onClick={() => createAdress()}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="p-mb-2">
                        <DataTable value={enderecos} dataKey="id">
                            <Column field="logradouro" header="Logradouro"></Column>
                            <Column field="numero" header="Número"></Column>
                            <Column field="complemento" header="Complemento"></Column>
                            <Column field="bairro" header="Bairro"></Column>
                            <Column field="cep" header="CEP"></Column>
                            <Column field="cidade" header="Cidade"></Column>
                            <Column field="estado" header="Estado"></Column>

                            <Column body={actionBodyTemplateAdress}></Column>
                        </DataTable>
                    </div>
                    <div className="p-mb-2">
                        {
                            !currentId ?
                                <Button
                                    label="Cadastrar"
                                    className="p-button-raised p-button-success"
                                    type="submit"
                                />
                                : <Button
                                    label="Atualizar"
                                    className="p-button-raised p-button-warning"
                                    type="submit"
                                />
                        }
                    </div>
                </form>

            </Dialog>

            <Dialog header="Confirmação" visible={visible}
                style={{ width: '40vw' }}
                footer={renderFooterDelete('displayBasic')}
                onHide={() => setVisible(false)}>
                <p>Você tem certeza que deseja excluir este registro?</p>
            </Dialog>

            <Dialog header="Confirmação" visible={visibleEndereco}
                style={{ width: '40vw' }}
                footer={renderFooterDeleteAdress('displayBasic')}
                onHide={() => setVisibleEndereco(false)}>
                <p>Você tem certeza que deseja excluir este registro??</p>
            </Dialog>

        </div>
    );
}

export { TabelaClientes }