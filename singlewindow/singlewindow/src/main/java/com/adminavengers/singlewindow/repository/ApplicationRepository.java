package com.adminavengers.singlewindow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.entity.Status;

import jakarta.transaction.Transactional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

	//to retrieve application based on status
	@Query("select a from Application a where status=?1")
	List<Application> findByStatus(Status status);
	
	//to update status
	@Modifying
	@Transactional
	@Query("update Application a set status=?2 where id=?1")
	int updateStatusById(Long id,Status status);
}
