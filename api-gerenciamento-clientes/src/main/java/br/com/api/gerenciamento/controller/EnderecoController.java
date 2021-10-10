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

import br.com.api.gerenciamento.dto.EnderecoRequestDTO;
import br.com.api.gerenciamento.dto.EnderecoResponseDTO;
import br.com.api.gerenciamento.model.Endereco;
import br.com.api.gerenciamento.service.EnderecoService;

@CrossOrigin("*")
@RestController
@RequestMapping("/endereco")
public class EnderecoController {

	@Autowired
	private EnderecoService enderecoService;
	
	@PostMapping
	public ResponseEntity<EnderecoResponseDTO> salvar(@RequestBody EnderecoRequestDTO enderecoRequestDTO) {
		Endereco endereco = enderecoService.salvar(EnderecoRequestDTO.toModel(enderecoRequestDTO));
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(endereco.getId()).toUri();

		return ResponseEntity.created(uri).body(EnderecoResponseDTO.fromModel(endereco));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Integer id) {
		
		enderecoService.deletar(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/{clienteId}")
	public ResponseEntity<List<EnderecoResponseDTO>> listarTodosEnderecosDeUmCliente(@PathVariable Integer clienteId) {
		List<EnderecoResponseDTO> enderecoResponseDTOs = EnderecoResponseDTO.fromModel(enderecoService.listarTodosEnderecosDeUmCliente(clienteId));
		return ResponseEntity.ok().body(enderecoResponseDTOs);
	}
	
	@GetMapping("buscar/{id}")
	public ResponseEntity<EnderecoResponseDTO> listarPorId(@PathVariable Integer id) {
		Endereco endereco = enderecoService.buscarPorId(id);
		return ResponseEntity.ok().body(EnderecoResponseDTO.fromModel(endereco));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<EnderecoResponseDTO> atualizar(@PathVariable Integer id, @RequestBody EnderecoRequestDTO enderecoRequestDTO) {
		Endereco endereco = EnderecoRequestDTO.toModel(enderecoRequestDTO);
		
		endereco.setId(id);
		EnderecoResponseDTO enderecoResponseDTO = EnderecoResponseDTO.fromModel(enderecoService.atualizar(endereco));
		return ResponseEntity.ok().body(enderecoResponseDTO);
	}
}
