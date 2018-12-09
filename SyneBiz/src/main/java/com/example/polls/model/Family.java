package com.example.polls.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.polls.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "family")
public class Family extends UserDateAudit {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank
	    @Size(max = 140)
	    private String name;
	    
	    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	    @ManyToOne
	    @JoinColumn(name = "brand_id")
	    private Brand brand;
	    

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
		

		public Brand getBrand() {
			return brand;
		}

		public void setBrand(Brand brand) {
			this.brand = brand;
		}

		
}
