package br.com.api.gerenciamento.dto;

import br.com.api.gerenciamento.model.Endereco;

public class EnderecoRequestDTO {

	private String logradouro;
	private String numero;
	private String complemento;
	private String bairro;
	private String cep;
	private String cidade;
	private String estado;

	public EnderecoRequestDTO(String logradouro, String numero, String complemento, String bairro, String cep,
			String cidade, String estado, Integer id_cliente) {
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cep = cep;
		this.cidade = cidade;
		this.estado = estado;
	}

	public static Endereco toModel(EnderecoRequestDTO enderecoRequestDTO) {
		Endereco endereco = new Endereco();
		endereco.setLogradouro(enderecoRequestDTO.getLogradouro());
		endereco.setNumero(enderecoRequestDTO.getNumero());
		endereco.setComplemento(enderecoRequestDTO.getComplemento());
		endereco.setCep(enderecoRequestDTO.getCep());
		endereco.setBairro(enderecoRequestDTO.getBairro());
		endereco.setCidade(enderecoRequestDTO.getCidade());
		endereco.setEstado(enderecoRequestDTO.getEstado());

		return endereco;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}
