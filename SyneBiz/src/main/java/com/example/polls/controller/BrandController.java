package com.example.polls.controller;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.polls.model.Brand;
import com.example.polls.model.Poll;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.BrandRequest;
import com.example.polls.payload.BrandResponse;
import com.example.polls.payload.PagedResponse;
import com.example.polls.payload.PollRequest;
import com.example.polls.payload.PollResponse;
import com.example.polls.payload.VoteRequest;
import com.example.polls.repository.PollRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.repository.VoteRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.BrandService;
import com.example.polls.service.PollService;
import com.example.polls.util.AppConstants;

@RestController
@RequestMapping("/api/brands")
public class BrandController {


    @Autowired
    private BrandService brandService;

    private static final Logger logger = LoggerFactory.getLogger(BrandController.class);

    @GetMapping
    @Secured("IS_AUTHENTICATED_ANONYMOUSLY")
    public PagedResponse<Brand> getBrands(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return brandService.getAllBrands(page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createBrand(@Valid @RequestBody BrandRequest brandRequest) {
    	 System.out.println("****************brands**************************");
        Brand brand = brandService.createBrand(brandRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{brandId}")
                .buildAndExpand(brand.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Brand Created Successfully"));
    }
    /*

    @GetMapping("/{pollId}")
    public PollResponse getPollById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long pollId) {
        return pollService.getPollById(pollId, currentUser);
    }

    @PostMapping("/{pollId}/votes")
    @PreAuthorize("hasRole('USER')")
    public PollResponse castVote(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long pollId,
                         @Valid @RequestBody VoteRequest voteRequest) {
        return pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, currentUser);
    }
*/

}
