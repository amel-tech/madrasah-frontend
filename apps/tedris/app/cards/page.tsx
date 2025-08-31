import { api } from "~/lib/api/server";

export default async function Cards() {
  const healthResult = await api.appControllerGetHealth()
  console.log('Health check:', healthResult);

  // Test the hello endpoint
  const helloResult = await api.appControllerGetHello();
  console.log('Hello result:', helloResult);

  // For now, let's display the API test results
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cards Page</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">API Test Results:</h2>
        <div className="bg-gray-100 p-3 rounded mt-2">
          <p><strong>Health Status:</strong> {healthResult.status}</p>
          <p><strong>Hello Message:</strong> {helloResult.data}</p>
        </div>
      </div>

      <div>
        <p>API is working! You can now add your cards logic here.</p>
        <p>Available API methods:</p>
        <ul className="list-disc list-inside mt-2">
          <li>appControllerGetHello</li>
          <li>appControllerGetHealth</li>
          <li>appControllerThrowError</li>
          <li>appControllerGetSecureHello</li>
          <li>exampleControllerGetAllExamples</li>
          <li>exampleControllerCreateExample</li>
          <li>exampleControllerGetExampleById</li>
          <li>exampleControllerDeleteExample</li>
        </ul>
      </div>
    </div>
  );
}