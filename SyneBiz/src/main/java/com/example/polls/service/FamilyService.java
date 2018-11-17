package com.example.polls.service;

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
import com.example.polls.model.Brand;
import com.example.polls.model.Family;
import com.example.polls.payload.BrandRequest;
import com.example.polls.payload.FamilyRequest;
import com.example.polls.payload.PagedResponse;
import com.example.polls.repository.FamilyRepository;
import com.example.polls.security.UserPrincipal;
import com.example.polls.util.AppConstants;

@Service
public class FamilyService {

	 @Autowired
	 private FamilyRepository familyRepository;
	 private static final Logger logger = LoggerFactory.getLogger(FamilyService.class);
	 
	 public PagedResponse<Family> getAllFamilys(UserPrincipal currentUser, int page, int size) {
	        validatePageNumberAndSize(page, size);
	        System.out.println("******************** "+page+"  ******** "+size);
	        // Retrieve Familys
	        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
	        Page<Family> familys = familyRepository.findAll(pageable);

	        if(familys.getNumberOfElements() == 0) {
	            return new PagedResponse<>(Collections.emptyList(), familys.getNumber(),
	            		familys.getSize(), familys.getTotalElements(), familys.getTotalPages(), familys.isLast());
	        }

	        List<Family> familyResponses=familys.getContent();
	        return new PagedResponse<>(familyResponses ,familys.getNumber(),familys.getSize(), familys.getTotalElements(), familys.getTotalPages(), familys.isLast());
	    }
	 
	    private void validatePageNumberAndSize(int page, int size) {
	        if(page < 0) {
	            throw new BadRequestException("Page number cannot be less than zero.");
	        }

	        if(size > AppConstants.MAX_PAGE_SIZE) {
	            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
	        }
	    }
	    
		public Family createFamily(@Valid FamilyRequest familyRequest) {
	        Family family = new Family();
	        family.setName(familyRequest.getName());
	        family.setBrand(familyRequest.getBrand());
	        return familyRepository.save(family);
		}
	 
}
