package com.adminavengers.singlewindow.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp  // wwe cant change once it is created but in @UpdateTimestamp we can change if it alredy created also
    private LocalDateTime actionTime;

    // Getters & Setters
}