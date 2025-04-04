package com.adminavengers.singlewindow.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "application")
public class Application {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable = false)
	private User user;
	
	@Column(nullable = false)
	private String businessname;
	
	@Column(nullable = false)
	private String companyname;
	
	@Column(nullable = false)
	private String companyaddress;
	
	@Column(nullable = false)
	private String businesstype;
	
	@Column(nullable = false,length = 10)
	private String phonenumber;
	
	@Column(nullable = false)
	private String email;
	
	
	@Column(nullable = false)
	private String descriptionaboutbusiness;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status= Status.PENDING;//Defalte status
	
	@Column(nullable = false,updatable = false)
	private LocalDateTime submittedAt=LocalDateTime.now();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getBusinessname() {
		return businessname;
	}

	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getCompanyaddress() {
		return companyaddress;
	}

	public void setCompanyaddress(String companyaddress) {
		this.companyaddress = companyaddress;
	}

	public String getBusinesstype() {
		return businesstype;
	}

	public void setBusinesstype(String businesstype) {
		this.businesstype = businesstype;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescriptionaboutbusiness() {
		return descriptionaboutbusiness;
	}

	public void setDescriptionaboutbusiness(String descriptionaboutbusiness) {
		this.descriptionaboutbusiness = descriptionaboutbusiness;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(LocalDateTime submittedAt) {
		this.submittedAt = submittedAt;
	}

	
	
	
	
	//toString
	
}
