package com.adminavengers.singlewindow.entity;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

//import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity                 
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false , unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password; 
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role; // Entrepreneur, Government_Official, Admin


	
	
	@Column(nullable = false, updatable = false )
	@CreationTimestamp
	private LocalDateTime createdAt;
	

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
						//toString()
//	@Override
//	public String toString() {
//		return "Users [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
//	}
	
	
	
	
	
	

}
