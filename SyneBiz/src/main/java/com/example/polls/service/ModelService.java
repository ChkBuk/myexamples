package com.example.polls.service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.polls.exception.BadRequestException;
import com.example.polls.model.Family;
import com.example.polls.model.Model;
import com.example.polls.payload.FamilyRequest;
import com.example.polls.payload.ModelRequest;
import com.example.polls.payload.PagedResponse;
import com.example.polls.repository.ModelRepository;
import com.example.polls.security.UserPrincipal;
import com.example.polls.util.AppConstants;

@Service
public class ModelService {
	 @Autowired
	 private ModelRepository modelRepository;
	 private static final Logger logger = LoggerFactory.getLogger(ModelService.class);
	 
	 public PagedResponse<Model> getAllModels(UserPrincipal currentUser, int page, int size) {
	        validatePageNumberAndSize(page, size);

	        // Retrieve Familys
	        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
	        Page<Model> models = modelRepository.findAll(pageable);

	        if(models.getNumberOfElements() == 0) {
	            return new PagedResponse<>(Collections.emptyList(), models.getNumber(),
	            		models.getSize(), models.getTotalElements(), models.getTotalPages(), models.isLast());
	        }

	        List<Model> modelResponses=models.getContent();
	        return new PagedResponse<>(modelResponses ,models.getNumber(),models.getSize(), models.getTotalElements(), models.getTotalPages(), models.isLast());
	    }
	 
	    private void validatePageNumberAndSize(int page, int size) {
	        if(page < 0) {
	            throw new BadRequestException("Page number cannot be less than zero.");
	        }

	        if(size > AppConstants.MAX_PAGE_SIZE) {
	            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
	        }
	    }
	    
		public Model createModel(@Valid ModelRequest modelRequest) {
			System.out.println("********************Inserting Model************************* "+modelRequest.getNormal_price());
	        Model model = new Model();
	        model.setName(modelRequest.getName());
	        model.setImage(modelRequest.getImage());
	        model.setIscompatible(modelRequest.getIscompatible());
	        model.setNormal_price(modelRequest.getNormal_price());
	        model.setWholesale_price(modelRequest.getWholesale_price());
	        model.setWholesale_qtn(modelRequest.getWholesale_qtn());
	        model.setBrand(modelRequest.getBrand());
	        model.setFamily(modelRequest.getFamily());
	        return modelRepository.save(model);
		}
}
