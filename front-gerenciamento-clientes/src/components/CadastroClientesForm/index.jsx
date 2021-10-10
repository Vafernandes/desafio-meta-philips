import { useState } from "react"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useForm } from "react-hook-form";
import { apiClientes } from '../../services/api'
import { Calendar } from "primereact/calendar"

const CadastroClientesForm = (props) => {
    const { register, handleSubmit } = useForm();

    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [showDialog, setShowDialog] = useState(false);


    const onSubmit = async ({ nomeCompleto, dataNascimento, cpf }) => {
        
        const cliente = {
            nomeCompleto,
            dataNascimento: new Intl.DateTimeFormat(['ban', 'id']).format(dataNascimento),
            cpf,
            enderecos
        }

        await apiClientes.post('', cliente);
        await props.carregarDadosApi()
        setShowDialog(false)
        setEnderecos([])
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
            </div>
        );
    }

    const editProduct = () => { }

    const confirmDeleteProduct = async (rowData) => {
        console.log(rowData.id)
        await apiClientes.delete(`${rowData.id}`)
        props.carregarDadosApi()
     }

    const actionBodyTemplateAdress = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
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

    return (
        <Dialog header="Cadastrar Cliente" visible={showDialog} style={{ width: '80vw' }} footer={renderFooter('showDialog')} onHide={() => setShowDialog(false)}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-d-flex p-flex-column marginInput">
                    <h2 className="marginLabel">Dados Pessoais</h2>
                    <div className="p-d-flex p-flex-wrap p-mb-2">
                        <div className="p-mr-5">
                            <div className="p-d-flex p-flex-column">
                                <label className="marginLabel">Nome completo</label>
                                <InputText  {...register('nomeCompleto')} />
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
                                <label htmlFor="mask" className="marginLabel">Data de Nascimento</label>
                                <Calendar id="mask" mask="99/99/9999" {...register('dataNascimento')} />
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
                                label="Adicionar novo endereco"
                                className="p-button-raised p-button-help"
                                style={{ marginTop: 30 }}
                                onClick={() => createAdress()}
                            />
                        </div>

                    </div>

                </div>

                <div className="p-mb-2">
                    <DataTable value={enderecos}>
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
                    <Button
                        label="Cadastrar"
                        className="p-button-raised p-button-success"
                        type="submit"
                    />
                </div>
            </form>

        </Dialog>
    )
}

export { CadastroClientesForm }