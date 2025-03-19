package com.adminavengers.singlewindow.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Document {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="application_id",nullable = false)
	private Application application;
	
	@Column(nullable = false)
	private String documentType;
	
	 @Column(nullable = false)
	 private String filePath; // Path to uploaded document
	 
	 @Column(nullable = false, updatable = false)
	 private LocalDateTime uploadedAt = LocalDateTime.now();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}
	 
	 //ToString
}
