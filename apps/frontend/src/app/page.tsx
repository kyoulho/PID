export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex shadow-lg">
        {/* Left Side - Image Section */}
        <div className="hidden md:flex bg-blue-500 items-center justify-center rounded-l-lg p-8">
          <img
            src="../../public/images/background.webp"
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-96 p-8 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-8">
            Please sign in to your account
          </p>

          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                로그인 상태 유지
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-colors"
            >
              로그인
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center justify-center">
            <span className="h-px bg-gray-300 w-1/4"></span>
            <span className="text-gray-400 px-3 text-sm">또는</span>
            <span className="h-px bg-gray-300 w-1/4"></span>
          </div>

          {/* Sign in with Google */}
          <button className="mt-4 w-full flex items-center justify-center border border-gray-300 py-2 rounded-md text-gray-600 hover:bg-gray-100">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            구글 계정으로 로그인
          </button>

          {/* Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
