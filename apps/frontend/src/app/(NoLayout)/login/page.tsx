import Image from "next/image";
import backgroundImg from "../../../../public/images/background.webp";
import { Button } from "@mui/material";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex shadow-lg">
        {/* Left Side - Image Section */}
        <div className="md:flex items-center justify-center rounded-l-lg p-8">
          <Image
            src={backgroundImg}
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-96 p-8 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Paradise <br /> Investment Diary
          </h1>

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
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-colors"
            >
              로그인
            </Button>
          </form>

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
