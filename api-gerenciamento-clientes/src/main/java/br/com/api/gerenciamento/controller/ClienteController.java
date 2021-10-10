package br.com.api.gerenciamento.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.api.gerenciamento.dto.ClienteRequestDTO;
import br.com.api.gerenciamento.dto.ClienteResponseDTO;
import br.com.api.gerenciamento.dto.ClienteCreateResponseDTO;
import br.com.api.gerenciamento.model.Cliente;
import br.com.api.gerenciamento.service.ClienteService;

@CrossOrigin("*")
@RestController
@RequestMapping("/gerenciamento-cliente")
public class ClienteController {
	
	@Autowired
	private ClienteService clienteService;
	
	@PostMapping
	public ResponseEntity<ClienteCreateResponseDTO> salvar(@RequestBody ClienteRequestDTO clienteRequestDTO) {
		
		Cliente cliente = clienteService.salvar(ClienteRequestDTO.toModel(clienteRequestDTO));
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(cliente.getId()).toUri();

		return ResponseEntity.created(uri).body(ClienteCreateResponseDTO.fromModel(cliente));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ClienteCreateResponseDTO> editar(@PathVariable Integer id, @RequestBody ClienteRequestDTO clienteRequestDTO) throws Exception {
		Cliente cliente = ClienteRequestDTO.toModel(clienteRequestDTO);
		
		cliente.setId(id);
		cliente = clienteService.editar(cliente);
		
		return ResponseEntity.ok().body(ClienteCreateResponseDTO.fromModel(cliente));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Integer id) {
		clienteService.deletar(id);
		
		return ResponseEntity.noContent().build();	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ClienteCreateResponseDTO> buscarPorId(@PathVariable Integer id) {
		return ResponseEntity.ok().body(ClienteCreateResponseDTO.fromModel(clienteService.buscarPorId(id)));
	}
	
	@GetMapping("/cliente/{cpf}")
	public ResponseEntity<ClienteCreateResponseDTO> buscarPorCPF(@PathVariable String cpf) {
		cpf.toString();
		return ResponseEntity.ok().body(ClienteCreateResponseDTO.fromModel(clienteService.buscarPorCpf(cpf)));
	}

	@GetMapping
	public ResponseEntity<List<ClienteResponseDTO>> listarTodos() {
		List<ClienteResponseDTO> clienteResponseDTOs = ClienteResponseDTO.fromModel(clienteService.listarTodos());
		return ResponseEntity.ok().body(clienteResponseDTOs);
	}

}
