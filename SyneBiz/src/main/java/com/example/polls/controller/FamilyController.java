package com.example.polls.controller;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.polls.model.Family;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.FamilyRequest;
import com.example.polls.payload.PagedResponse;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.FamilyService;
import com.example.polls.util.AppConstants;

@RestController
@RequestMapping("/api/familys")
public class FamilyController {


    @Autowired
    private FamilyService familyService;

    private static final Logger logger = LoggerFactory.getLogger(FamilyController.class);

    @GetMapping
    public PagedResponse<Family> getFamilys(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return familyService.getAllFamilys(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createFamily(@Valid @RequestBody FamilyRequest familyRequest) {
    	
        Family family = familyService.createFamily(familyRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{familyId}")
                .buildAndExpand(family.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Toner Family Created Successfully"));
    }


}
