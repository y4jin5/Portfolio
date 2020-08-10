var charCho = Array(
	'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
	'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
	);

var charJung = Array(
	'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
	'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ',
	'ㅣ'
	);

var charJong = Array(
	'',   'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
	'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
	'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
	);

var charChoEng = Array(
	'r', 'R', 's', 'e', 'E', 'f', 'a', 'q', 'Q', 't',
	'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g'
	);

var charJungEng = Array(
	'k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'hk',
	'ho', 'hl', 'y', 'n', 'nj', 'np', 'nl', 'b', 'm', 'ml',
	'i'
	);

var charJongEng = Array(
	'',   'r', 'R', 'rt', 's', 'sw', 'sg', 'e', 'f', 'fr',
	'fa', 'fq', 'ft', 'fx', 'fv', 'fg', 'a', 'q', 'qt', 't',
	'T', 'd', 'w', 'c', 'z', 'x', 'v', 'g'
	);

var charChoRom = Array(
	'g,k', 'kk', 'n', 'd,t', 'tt', 'r,l', 'm', 'b,p', 'pp', 's',
	'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'
	);

var charJungRom = Array(
	'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa',
	'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui',
	'i'
	);

var charJongRom = Array(
	'',   'g,k', 'kk', 'gs,ks', 'n', 'nj', 'nh', 'd,t', 'r,l', 'rg,rk,lg,lk',
	'rm,lm', 'rb,lb,rp,lp', 'rs,ls', 'rtt,ltt', 'rp,lp', 'rh,lh', 'm', 'b,p', 'bs,ps', 's',
	'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'
	);

function idxCho(ch_) {
	var ch = ch_.charCodeAt(0);
	if (ch < 0xAC00 || ch > 0xD7AF) return -1;
	var uniVal = ch - 0xAC00;
	var jong = uniVal % 28;
	
	return parseInt(((uniVal - jong) / 28 ) / 21);
}

function idxJung(ch_) {
	var ch = ch_.charCodeAt(0);
	if (ch < 0xAC00 || ch > 0xD7AF) return -1;
	var uniVal = ch - 0xAC00;
	var jong = uniVal % 28;
	
	return ((uniVal - jong ) / 28 ) % 21;
}

function idxJong(ch_) {
	var ch = ch_.charCodeAt(0);
	if (ch < 0xAC00 || ch > 0xD7AF) return -1;
	var uniVal = ch - 0xAC00;
	
	return uniVal % 28;
}

function gulCho(ch_) {
	var idx = idxCho(ch_);
	if (idx == -1) return '';
	return charCho[idx];
}

function gulJung(ch_) {
	var idx = idxJung(ch_);
	if (idx == -1) return '';
	return charJung[idx];
}

function gulJong(ch_) {
	var idx = idxJong(ch_);
	if (idx == -1) return '';
	return charJong[idx];
}

function gulChoEng(ch_) {
	var idx = idxCho(ch_);
	if (idx == -1) return '';
	return charChoEng[idx];
}

function gulJungEng(ch_) {
	var idx = idxJung(ch_);
	if (idx == -1) return '';
	return charJungEng[idx];
}

function gulJongEng(ch_) {
	var idx = idxJong(ch_);
	if (idx == -1) return '';
	return charJongEng[idx];
}

function gulEng(ch_) {
	return gulChoEng(ch_) + gulJungEng(ch_) + gulJongEng(ch_);
}

function gulChoRom(ch_) {
	var idx = idxCho(ch_);
	if (idx == -1) return '';
	return charChoRom[idx];
}

function gulJungRom(ch_) {
	var idx = idxJung(ch_);
	if (idx == -1) return '';
	return charJungRom[idx];
}

function gulJongRom(ch_) {
	var idx = idxJong(ch_);
	if (idx == -1) return '';
	return charJongRom[idx];
}


function gulRom(ch_) {

	var chos = gulChoRom(ch_).split(',');
	var jungs = gulJungRom(ch_).split(',');
	var jongs = gulJongRom(ch_).split(',');
	
	var lenc0 = chos.length;
	var lenj0 = jungs.length;
	var lenz0 = jongs.length;
	
	var to1 = '';
	var to2 = '';
	var to3 = '';
	var to4 = '';
	
	var rtn = '';

	to1 = '';
	for (var c0 = 0; c0 < lenc0; c0 ++) {
		to2 = to1 + chos[c0];
		for (var j0 = 0; j0 < lenj0; j0 ++) {
			to3 = to2 + jungs[j0];
			for (var z0 = 0; z0 < lenz0; z0 ++) {
				to4 = to3 + jongs[z0];
				if (rtn != '') {
					rtn += ',';
				}
				rtn += to4;
			}
		}
	}

	return rtn;
}

function hasLastJong(str_) {
	var str = (str_ || '').trim();
	return gulJong(str.charAt(str.length - 1)) != '';
}

function testHangul() {
	alert(gulJong('한'));
	alert(gulJong('하'));
	alert(gulJong('gk'));
	alert('hasLastJong(\'사업자 번호\') - ' + hasLastJong('사업자 번호'));
	alert('hasLastJong(\'업종\') - ' + hasLastJong('업종'));
	alert('hasLastJong(\'업태\') - ' + hasLastJong('업태'));
	alert('hasLastJong(\'우편번호\') - ' + hasLastJong('우편번호'));
	alert('hasLastJong(\'주소\') - ' + hasLastJong('주소'));
	alert('hasLastJong(\'상세주소\') - ' + hasLastJong('상세주소'));
	alert('hasLastJong(\'팩스번호\') - ' + hasLastJong('팩스번호'));
	alert('hasLastJong(\'부가정보\') - ' + hasLastJong('부가정보'));
	alert('hasLastJong(\'TEST URL \') - ' + hasLastJong('TEST URL '));
	alert('hasLastJong(\'고객사 홈페이지\') - ' + hasLastJong('고객사 홈페이지'));
	alert('hasLastJong(\'우선순위\') - ' + hasLastJong('우선순위'));
	alert('hasLastJong(\'중요도\') - ' + hasLastJong('중요도'));
	alert('hasLastJong(\'담당자 아이디\') - ' + hasLastJong('담당자 아이디'));
	alert('hasLastJong(\'담당자 비밀번호\') - ' + hasLastJong('담당자 비밀번호'));
	alert('hasLastJong(\'담당자 업무\') - ' + hasLastJong('담당자 업무'));
	alert('hasLastJong(\'담당자 소속\') - ' + hasLastJong('담당자 소속'));
	alert('hasLastJong(\'담당자 부서\') - ' + hasLastJong('담당자 부서'));
	alert('hasLastJong(\'담당자 직위\') - ' + hasLastJong('담당자 직위'));
	alert('hasLastJong(\'담당자 업무명\') - ' + hasLastJong('담당자 업무명'));
	alert('hasLastJong(\'담당자 전화\') - ' + hasLastJong('담당자 전화'));
	alert('hasLastJong(\'담당자 핸드폰\') - ' + hasLastJong('담당자 핸드폰'));
	alert('hasLastJong(\'담당자 이메일\') - ' + hasLastJong('담당자 이메일'));
}

//testHangul();

//alert(gulEng('성'));
//alert(gulRom('성'));

/*
출    처 : 한국어 형태소 분석과 정보 검색
처음본곳 : http://flashcafe.org/javascript_study/7251

This program uses UNICODE 2.0. So this consists of Johap code.
There are many code through ancient Hangul to recent one.
Here, I used consonant existing in UNICODE 12593~12622 in decimal.
And used vowel existing in UNICODE 12623~12643 in decimal.
The first consonant consists of 19 words, and the vowel consists of 21 words,
and the final consonant consists of 28 words. We can make Hangul Johap code in the following way,

(Hangul word) = 0xAC00 + chosung * 21 * 28 + jungsung * 28 + jongsung
 
44032 + (초성문자코드 * 588) + (중성문자코드 * 28) + (종성문자코드)로 조합
*/
