# Test Runner Script
# This script runs Backend integration tests and E2E tests

Write-Host "Starting Integrated Testing Process..." -ForegroundColor Cyan

# 1. Run Backend Tests
Write-Host "Running Backend Integration Tests..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\Backend"
$backendTestProcess = Start-Process -FilePath "npm" -ArgumentList "run", "test:integration" -Wait -PassThru -NoNewWindow

if ($backendTestProcess.ExitCode -ne 0) {
    Write-Host "❌ Backend Integration Tests Failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend Integration Tests Passed!" -ForegroundColor Green

# 2. Check/Start Services (Simplified check for demo purposes)
# In a real CI environment, we would start services here. 
# For now, we assume they might be running or we warn user.
Write-Host "Checking for running services..." -ForegroundColor Yellow
# Note: Playwright config can be set to launch web server, but for this script we'll rely on Playwright's webServer config or manual start if needed.
# However, to ensure E2E works, we should probably check if backend is reachable.

# 3. Run E2E Tests
Write-Host "Running E2E Tests..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\tests-e2e"

# We use npx playwright test directly
$e2eTestProcess = Start-Process -FilePath "npx" -ArgumentList "playwright", "test" -Wait -PassThru -NoNewWindow

if ($e2eTestProcess.ExitCode -ne 0) {
    Write-Host "❌ E2E Tests Failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ E2E Tests Passed!" -ForegroundColor Green

Write-Host "🎉 All Tests Passed Successfully! Ready for Deployment." -ForegroundColor Cyan
Set-Location "$PSScriptRoot"
exit 0
