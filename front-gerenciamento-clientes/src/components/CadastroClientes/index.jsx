import { Card } from "primereact/card"

const CadastroClientes = () => {
    <Card>
        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col">
                <label htmlFor="firstname2">Firstname</label>
                <InputText id="firstname2" type="text" />
            </div>
            <div className="p-field p-col">
                <label htmlFor="lastname2">Lastname</label>
                <InputText id="lastname2" type="text" />
            </div>
        </div>
    </Card>
}

export { CadastroClientes }