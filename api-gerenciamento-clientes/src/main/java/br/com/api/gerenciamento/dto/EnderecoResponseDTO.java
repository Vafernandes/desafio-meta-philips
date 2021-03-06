package br.com.api.gerenciamento.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.api.gerenciamento.model.Endereco;

public class EnderecoResponseDTO {
	
	private Integer id;
	private String logradouro;
	private String numero;
	private String complemento;
	private String bairro;
	private String cep;
	private String cidade;
	private String estado;
	private Integer id_cliente;

	public EnderecoResponseDTO(Integer id, String logradouro, String numero, String complemento, String bairro, String cep,
			String cidade, String estado, Integer id_cliente) {
		this.id = id;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cep = cep;
		this.cidade = cidade;
		this.estado = estado;
		this.id_cliente = id_cliente;
	}

	public static List<EnderecoResponseDTO> fromModel(List<Endereco> enderecos) {
		List<EnderecoResponseDTO> enderecoResponseDTOs = new ArrayList<EnderecoResponseDTO>();
		
		for (Endereco endereco : enderecos) {
			enderecoResponseDTOs.add(fromModel(endereco));
		}
		
		return enderecoResponseDTOs;
	}

	public static EnderecoResponseDTO fromModel(Endereco endereco) {
		return new EnderecoResponseDTO(endereco.getId(), endereco.getLogradouro(), endereco.getNumero(), endereco.getComplemento(),
				endereco.getBairro(), endereco.getCep(), endereco.getCidade(), endereco.getEstado(),
				endereco.getCliente().getId());
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Integer getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(Integer id_cliente) {
		this.id_cliente = id_cliente;
	}

}
