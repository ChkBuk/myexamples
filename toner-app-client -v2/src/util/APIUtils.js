import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
    //  console.log("No Access token set........");
        return Promise.reject("No access token set.");
    }
  //  console.log("Access token set. 1");
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });

}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
/*export function getAllBrands(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/brands?page=" + page + "&size=" + size,
        method: 'GET'
    });
}*/
export function getAllBrands(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/brands?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function createBrand(brandData) {
    return request({
        url: API_BASE_URL + "/brands",
        method: 'POST',
        body: JSON.stringify(brandData)
    });
}
export function getAllFamilys(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/familys?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function getFamilysByBrandId(brandId, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/familys/" + brandId + "?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function createFamily(familyData) {
    return request({
        url: API_BASE_URL + "/familys",
        method: 'POST',
        body: JSON.stringify(familyData)
    });
}
export function getAllModels(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/models?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function getModelsByFamilyId(familyId, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/models/byfamily/" + familyId + "?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function getModelsByBrandId(brandId, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/models/bybrand/" + brandId + "?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function getModelsById(modelId, page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;
    return request({
        url: API_BASE_URL + "/models/bymodel/" + modelId+ "?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function createModel(modelData) {
  console.log(" modelData :"+modelData.normal_price);
    return request({
        url: API_BASE_URL + "/models",
        method: 'POST',
        body: JSON.stringify(modelData)
    });
}
export function searchModes(page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
      url: API_BASE_URL + "/models?page=" + page + "&size=" + size,
      method: 'GET'
  });
}
